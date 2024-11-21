import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/models/Items';
import { Transaction } from 'src/app/models/Transaction';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { Constants } from 'src/app/models/Constant';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  defaultImage = '../../../../assets//equipment_default_image.png';
  checkedBy: string = ''; // Checked By value
  isloading: boolean = false;
  equipmentTypeControl = new FormControl();

  brandControl = new FormControl();
  filteredBrands!: Observable<string[]>;

  isFetching: boolean = true;
  imageUrl: any = null;
  googleDriveLink: string = '';

  userDepartment: any = '';
  userType: any = '';

  location: string[] = [];

  locationControl = new FormControl();
  filteredLocation!: Observable<string[]>;
  brands: string[] = [];
  transactiontype: string = '';
  // matters: string[] = Constants.equipmentMatterType;
  currentUser: User;

  equipmenttypes: string[] = [];
  locations: string[] = [];
  categories: string[] = [];
  inventorytypes: string[] = Constants.equipmentInventoryType;
  departments: string[] = Constants.departments;
  matters: string[] = Constants.equipmentMatterType;
  conditions: string[] = Constants.equipmentStatus;
  filteredequipmenttypes!: Observable<string[]>;
  filteredbrands!: Observable<string[]>;
  filteredlocations!: Observable<string[]>;
  filtereddepartments!: Observable<string[]>;
  filteredinventorytypes!: Observable<string[]>;
  filteredmatters!: Observable<string[]>;
  filteredconditions!: Observable<string[]>;
  filteredcategories!: Observable<string[]>;
  // remarks: Remark[] = [
  //   { value: 'Functional', viewValue: 'Functional' },
  //   { value: 'Defective', viewValue: 'Defective' },
  //   { value: 'Turnover', viewValue: 'Turnover' },
  // ];
  remarks: string[] = Constants.equipmentStatus;
  // inventorytypes: string[] = Constants.equipmentInventoryType;

  addItemForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.currentUser = this.authService.getCurrentUser() as User;
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      equipmentType: ['', Validators.required],
      brand: ['', Validators.required],
      matter: ['', Validators.required],
      serialNo: [''],
      description: [''],
      modelNo: ['', Validators.required],
      inventorytype: ['', Validators.required],
      inventorytag: [false, Validators.required],
      color: ['', Validators.required],
      condition: ['', Validators.required],
      checkedBy: [this.currentUser.firstName, Validators.required],
      location: ['', Validators.required],
      department: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalQuantity: [1, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      isborrow: [true, Validators.required],
      dateAcquired: ['', Validators.required],
      categories: [''],
      warrantyPeriod: [''],
      // images: this.fb.array([])
      conditionAndQuantityForm: this.fb.group({
        condition: [''],
        quantity: [''],
      }),
      images: this.fb.group({
        url: [''],
        thumbnailUrl: [''],
        midSizeUrl: [''],
      }),
      conditionAndQuantity: this.fb.array([]),
    });
    this.conditionAndQuantity.push(this.createConditionAndQuantityForm());
  }

  ngOnInit(): void {
    this.userDepartment = this.currentUser?.department[0];
    this.checkedBy = `${this.currentUser?.firstName} ${this.currentUser?.lastName}`;
    this.userType = this.currentUser?.role;
    this.loadEquipmentTypes();
    this.loadBrandList();
    this.loadLocationList();
    this.equipmentService.onAddEquipmentImage().subscribe({
      next: (resp) => {
        (this.addItemForm.controls['images'] as FormGroup).controls['url'].setValue(resp);
      },
    });

    this.filteredequipmenttypes = this.addItemForm.controls['equipmentType'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.equipmenttypes))
    );

    this.filteredbrands = this.addItemForm.controls['brand'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.brands))
    );

    this.filteredlocations = this.addItemForm.controls['location'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.locations))
    );

    this.filtereddepartments = this.addItemForm.controls['department'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.departments))
    );

    this.filteredinventorytypes = this.addItemForm.controls['inventorytype'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.inventorytypes))
    );

    this.filteredmatters = this.addItemForm.controls['matter'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.matters))
    );

    this.filteredconditions = this.addItemForm.controls['condition'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.conditions))
    );

    this.filteredcategories = this.addItemForm.controls['categories'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.categories))
    );

    this.conditionAndQuantity.valueChanges.subscribe(() => {
      const total = this.conditionAndQuantity.controls.reduce((sum, control) => {
        const quantity = parseInt(control.get('quantity')?.value) || 0; // Ensure a default of 0
        return sum + quantity;
      }, 0);

      this.addItemForm.controls['totalQuantity'].patchValue(total);
    });
  }

  get conditionAndQuantity(): FormArray {
    return this.addItemForm.get('conditionAndQuantity') as FormArray;
  }

  createConditionAndQuantityForm(): FormGroup {
    return this.fb.group({
      condition: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addConditionAndQuantity(): void {
    this.conditionAndQuantity.push(this.createConditionAndQuantityForm());
  }

  private _filter(value: string, options: string[]): string[] {
    console.log('filtere', value);
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  private _filterLocation(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.location.filter((option) => option.toLowerCase().includes(filterValue));
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

  searchEquipment(event: any) {
    const searchword = event.target.value;
    this.equipmentService.searchEquipmentbyName(searchword).subscribe((resp) => {
      console.log(resp.data);
    });
  }

  onSubmit(): void {
    console.log('Form check valid: ', this.addItemForm.value);

    if (this.addItemForm.valid) {
      this.isloading = true;
      const itemData = this.addItemForm.value;
      this.equipmentService.addEquipment(itemData).subscribe({
        next: (resp) => {
          this.snackbarService.openSnackBar(resp.message, 'close');
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.message, 'Close', true);
          this.isloading = false;
        },
        complete: () => {
          this.isloading = false;
          this.dialogRef.close();
        },
      });
    } else {
      this.snackbarService.openSnackBar('Invalid Form', 'close', true);
    }
  }

  addTransactionItem(transaction: Transaction): void {
    this.equipmentService.addTransaction(transaction).subscribe(
      (data) => {
        console.log('Transaction submitted successfully:', data);
      },
      (error) => {
        console.error('Error submitting report:', error);
      }
    );
  }

  getCategories(): void {
    this.equipmentService.getCategories(this.currentUser.department).subscribe({
      next: (resp) => {
        this.categories = resp.data;
        this.addItemForm.get('categories')?.setValue('');
      },
      error: (err) => console.error(err),
    });
  }

  loadEquipmentTypes(): void {
    this.equipmentService.getEquipmentTypes(this.currentUser.department).subscribe({
      next: (resp) => {
        this.equipmenttypes = resp.data;
        this.addItemForm.get('equipmentType')?.setValue('');
      },
    });
  }

  loadBrandList(): void {
    this.equipmentService.getBrandList(this.currentUser.department).subscribe({
      next: (resp) => {
        this.brands = resp.data;
        this.addItemForm.get('brand')?.setValue('');
      },
    });
  }
  loadLocationList(): void {
    this.equipmentService.getLocationList(this.currentUser.department).subscribe({
      next: (resp) => {
        this.locations = resp.data;
        this.addItemForm.get('location')?.setValue('');
      },
    });
  }
}
