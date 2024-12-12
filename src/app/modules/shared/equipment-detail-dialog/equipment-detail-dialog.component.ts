import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Item } from 'src/app/models/Items';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Constants } from 'src/app/models/Constant';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

type Data = {
  item: Item;
  action: 'Confirm' | 'Edit';
};
@Component({
  selector: 'app-equipment-detail-dialog',
  templateUrl: './equipment-detail-dialog.component.html',
  styleUrls: ['./equipment-detail-dialog.component.css'],
})
export class EquipmentDetailDialogComponent implements OnInit {
  user: User;
  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  equipmentForm: FormGroup;
  canEdit: boolean = false;
  canUpdate: boolean = false;
  canConfirm: boolean = false;

  brands: string[] = [];
  locations: string[] = [];
  inventorytypes: string[] = Constants.equipmentInventoryType;
  departments: string[] = Constants.departments;
  matters: string[] = Constants.equipmentMatterType;
  conditions: string[] = Constants.equipmentStatus;
  categories: string[] = [];
  filteredbrands!: Observable<string[]>;
  filteredlocations!: Observable<string[]>;
  filtereddepartments!: Observable<string[]>;
  filteredinventorytypes!: Observable<string[]>;
  filteredmatters!: Observable<string[]>;
  filteredconditions!: Observable<string[]>;
  filteredcategories!: Observable<string[]>;

  transaction!: Transaction;
  imageUrl: any = null;

  constructor(
    public dialogRef: MatDialogRef<EquipmentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private snackbarService: SnackbarService
  ) {
    // this.itemDetails = data;
    this.equipmentForm = fb.group({
      _id: [data.item._id],
      serialNo: [data.item.serialNo],
      equipmentType: [data.item.equipmentType],
      name: [data.item.name],
      brand: [data.item.brand],
      color: [data.item.color],
      modelNo: [data.item.modelNo],
      quantity: [data.item.quantity],
      department: [data.item.department],
      unit: [data.item.unit],
      matter: [data.item.matter],
      inventorytype: [data.item.inventorytype],
      description: [data.item.description || ''],
      dateAcquired: [data.item.dateAcquired],
      location: [data.item.location],
      condition: [data.item.condition],
      categories: [data.item.categories],
      images: fb.group({
        url: data.item.images.url,
        midSizeUrl: data.item.images.midSizeUrl,
        thumbnailUrl: data.item.images.thumbnailUrl,
      }),
      checkedBy: [data.item.checkedBy],
      isborrow: [data.item.isborrow],
      conditionAndQuantity: this.fb.array([]),
      totalQuantity: [data.item.totalQuantity],

    });
    this.user = this.authService.getCurrentUser() as User;
    this.imageUrl = this.data.item.images.midSizeUrl;
    this.canUpdate = this.authService.hasAnyRoles(['chairman', 'oic', 'reads'], this.user.role);
    this.canConfirm = this.authService.hasAnyRoles(['chairman', 'oic'], this.user.role);
  }

  ngOnInit(): void {
    this.equipmentService.onAddEquipmentImage().subscribe({
      next: (resp) => {
        (this.equipmentForm.controls['images'] as FormGroup).controls['url'].setValue(resp);
      },
    });

    this.filteredbrands = this.equipmentForm.controls['brand'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.brands))
    );

    this.filteredlocations = this.equipmentForm.controls['location'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.locations))
    );

    this.filtereddepartments = this.equipmentForm.controls['department'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.departments))
    );

    this.filteredinventorytypes = this.equipmentForm.controls['inventorytype'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.inventorytypes))
    );

    this.filteredmatters = this.equipmentForm.controls['matter'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.matters))
    );

    this.filteredconditions = this.equipmentForm.controls['condition'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.conditions))
    );

    this.filteredcategories = this.equipmentForm.controls['categories'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.categories))
    );

    this.data.item.conditionAndQuantity.forEach((item) => this.conditionAndQuantity.push(this.createConditionAndQuantityForm(item.condition, item.quantity)));
    this.conditionAndQuantity.valueChanges.subscribe(() => {
      const total = this.conditionAndQuantity.controls.reduce((sum, control) => {
        const quantity = parseInt(control.get('quantity')?.value) || 0; // Ensure a default of 0
        return sum + quantity;
      }, 0);

      this.equipmentForm.controls['totalQuantity'].patchValue(total);
    });
    this.getBrands();
    this.getLocations();
    this.getCategories();
    this.getEquipmentHistory();
  }

  get conditionAndQuantity(): FormArray {
    return this.equipmentForm.get('conditionAndQuantity') as FormArray;
  }

  createConditionAndQuantityForm(condition: string, quantity: number): FormGroup {
    return this.fb.group({
      condition: [condition, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
    });
  }

  addConditionAndQuantity(): void {
    this.conditionAndQuantity.push(this.createConditionAndQuantityForm('functional', 1));
  }

  removeConditionAndQuantity(index: number): void {
    if (this.conditionAndQuantity.length > 1) {
      this.conditionAndQuantity.removeAt(index);
    } else {
      // Optionally handle the case where there is only one form group remaining
      console.warn('Cannot remove the last condition and quantity');
    }
  }

  getBrands() {
    this.equipmentService.getBrandList(this.user.department).subscribe({
      next: (resp) => (this.brands = resp.data),
      error: (err) => console.error(err),
    });
  }

  getLocations() {
    this.equipmentService.getLocationList(this.user.department).subscribe({
      next: (resp) => (this.locations = resp.data),
      error: (err) => console.error(err),
    });
  }

  getCategories() {
    this.equipmentService.getCategories(this.user.department).subscribe({
      next: (resp) => (this.categories = resp.data),
      error: (err) => console.error(err),
    });
  }

  getEquipmentHistory() {
    this.transactionService.getTransation([this.data.item._id]).subscribe((resp) => {
      console.log('transaction resp', resp);
      this.transaction = resp.data[0];
    });
  }

  loadImageFromFile(event: Event): void {
    console.log('files', (event.target as HTMLInputElement).files);
    let files = (event.target as HTMLInputElement).files as FileList;

    for (let x = 0; x < files.length; x++) {
      if (this.validateImage(files[0])) {
        this.previewImage(files[0]);
      }
    }
  }

  validateImage(image: File): Boolean {
    const validtypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 5e6; // 10MB
    if (!validtypes.includes(image.type)) {
      console.log('not valid haha');
      this.snackbarService.openSnackBar('invalid image type', 'ok', true);
      return false;
    }
    if (image.size > maxSizeInBytes) {
      this.snackbarService.openSnackBar('image size too large', 'ok', true);
      return false;
    }
    return true;
  }

  previewImage(image: File) {
    // read the image...
    var reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imageUrl = e?.target?.result;
      this.equipmentService.addEquipmentImageSubject.next(this.imageUrl);
    };
    reader.readAsDataURL(image);
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
