import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Item } from 'src/app/models/Items';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Constants } from 'src/app/models/Constant';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';

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

  brands: string[] = [];
  locations: string[] = [];
  inventorytypes: string[] = Constants.equipmentInventoryType;
  departments: string[] = Constants.departments;
  matters: string[] = Constants.equipmentMatterType;
  conditions: string[] = Constants.equipmentStatus;
  filteredbrands!: Observable<string[]>;
  filteredlocations!: Observable<string[]>;
  filtereddepartments!: Observable<string[]>;
  filteredinventorytypes!: Observable<string[]>;
  filteredmatters!: Observable<string[]>;
  filteredconditions!: Observable<string[]>;
  transaction!: Transaction;

  constructor(
    public dialogRef: MatDialogRef<EquipmentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private authService: AuthService,
    private transactionService: TransactionService
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
      description: [data.item.description],
      dateAcquired: [data.item.dateAcquired],
      location: [data.item.location],
      condition: [data.item.condition],
      images: fb.group({
        url: data.item.images.url,
        midSizeUrl: data.item.images.midSizeUrl,
        thumbnailUrl: data.item.images.thumbnailUrl,
      }),
      isborrow: [data.item.isborrow],
    });

    this.user = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
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

    this.filteredconditions= this.equipmentForm.controls['condition'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.conditions))
    );

    this.getBrands();
    this.getLocations();
    this.getEquipmentHistory();
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

  getEquipmentHistory() {
    this.transactionService.getTransation([this.data.item._id]).subscribe((resp) => {
      console.log('transaction resp', resp);
      this.transaction = resp.data[0];
    });
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
