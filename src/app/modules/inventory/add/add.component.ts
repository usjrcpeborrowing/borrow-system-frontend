import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
interface Matter {
  value: string;
  viewValue: string;
}

interface Status {
  value: string;
  viewValue: string;
}

interface Remark {
  value: string;
  viewValue: string;
}
interface InventoryType {
  value: string;
  viewValue: string;
}

interface Department {
  value: string;
  viewValue: string;
}

interface Equipment{
  name: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  checkedBy: string = "John Doe"; // Checked By value
  
    
  equipmentTypeControl = new FormControl();
  filteredEquipmentTypes!: Observable<string[]>; // Add ! here
  
  brandControl = new FormControl();
  filteredBrands!: Observable<string[]>;
  
  isFetching: boolean = false;
  imageUrl: string | null = null;
  googleDriveLink: string = '';
  
  
  equipmenttypes: string[] = [];
  brands: string[] = [];
  matters: Matter[] = [
    {value: 'Solid', viewValue: 'Solid'},
    {value: 'Liquid', viewValue: 'Liquid'},
  ];

  remarks: Remark[] = [
    {value: 'Functional', viewValue: 'Functional'},
    {value: 'Defective', viewValue: 'Defective'},
    {value: 'Turnover', viewValue: 'Turnover'},
  ];
  inventorytypes: InventoryType[] = [
    {value: 'Inventory', viewValue: 'Inventory'},
    {value: 'Non-inventory', viewValue: 'Non-inventory'},
  ];
  
  addItemForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private equipmentService: EquipmentService ,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private fb: FormBuilder,
  ) {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      equipmentType: ['', Validators.required],
      brand: ['', Validators.required],
      matter: ['', Validators.required],
      serialNo: ['', Validators.required],
      inventorytype: ['', Validators.required],
      color: ['', Validators.required],
      remarks: ['', Validators.required],
      checkedBy: ['', Validators.required],
      department: ['', Validators.required],
      quantity: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    
  this.loadEquipmentTypes();
  this.loadBrandList();
    this.filteredEquipmentTypes = this.equipmentTypeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEquipmentTypes(value))
    );
    this.filteredBrands = this.brandControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBrands(value))
    );
  }

  private _filterEquipmentTypes(value: string): string[] {
    console.log('Filtering equipment types with value:', value);
    const filterValue = value.toLowerCase();
    const filteredOptions = this.equipmenttypes.filter(option => option.toLowerCase().includes(filterValue));
    console.log('Filtered options:', filteredOptions);
    return filteredOptions;
  }
  
  
  private _filterBrands(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brands.filter(option => option.toLowerCase().includes(filterValue));
  }
  loadImageFromGoogleDrive(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    const googleDriveLink = inputElement.value;

    this.googleDriveLink = googleDriveLink;
    const match = this.googleDriveLink.match(/\/(?:file\/d\/|thumbnail\?id=)([\w-]+)(?:\/|$)/);
    
    if (match) {
        const imageId = match[1];
        this.imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
        console.log('Image URL:', this.imageUrl);
    } else {
        this.imageUrl = null;
    }
  }

  searchEquipment(event: any) {
    const searchword = event.target.value;
    this.equipmentService.searchEquipmentbyName(searchword).subscribe(resp=> {
      console.log(resp.data)
    })
  }

  onSubmit(): void {
    
    this.isFetching = true;
    console.log('Form check valid: ', this.addItemForm.value);
    
    if (this.addItemForm.valid) {
      const itemData = this.addItemForm.value;
    
      itemData.images = { Url: this.googleDriveLink };
      this.equipmentService.addEquipment(itemData).subscribe(
        response => {
          
          this.isFetching = false;
          console.log('Item created successfully:', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Error creating item:', error);
        }
      );
      const equipmentTypeData = { name: itemData.equipmentType };
      this.equipmentService.addEquipmentType(equipmentTypeData).subscribe(
        response => {
          console.log('Equipment type added successfully:', response);
        },
        error => {
          console.error('Error adding equipment type:', error);
        }
      );
  } else {
      console.log('Form is not valid');
  }
  
  }

  loadEquipmentTypes(): void {
    this.equipmentService.getEquipmentTypes().subscribe(
      (response) => {
        this.equipmenttypes = response.data;
        console.log('Equipment types loaded:', this.equipmenttypes);
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }

  loadBrandList(): void {
    this.equipmentService.getBrandList().subscribe(
      (response) => {
        this.brands = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
  
}
