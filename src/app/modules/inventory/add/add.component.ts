import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Transaction } from 'src/app/models/Transaction';
import { AuthService } from 'src/app/services/auth.service';
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
  checkedBy: string = ''; // Checked By value
  
    
  equipmentTypeControl = new FormControl();
  filteredEquipmentTypes!: Observable<string[]>; // Add ! here
  
  brandControl = new FormControl();
  filteredBrands!: Observable<string[]>;
  
  isFetching: boolean = false;
  imageUrl: string | null = null;
  googleDriveLink: string = '';
  
  userDepartment: any = '';
  userType: any = '';
  equipmenttypes: string[] = [];
  
  location: string[] = [];
  
  locationControl = new FormControl();
  filteredLocation!: Observable<string[]>;
  brands: string[] = [];
  transactiontype: string = '';
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
    private authService: AuthService, 
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
      location: ['', Validators.required],
      department: ['', Validators.required],
      quantity: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    
    const currentUser = this.authService.getCurrentUser();
    this.userDepartment = currentUser?.department;
    this.checkedBy = `${currentUser?.name.firstName} ${currentUser?.name.lastName}`;
    this.userType = currentUser?.role;
    this.loadEquipmentTypes();
    this.loadBrandList();
    this.loadLocationList();
    this.filteredEquipmentTypes = this.addItemForm.get('equipmentType')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEquipmentTypes(value))
   );
   this.filteredBrands = this.addItemForm.get('brand')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBrands(value))
   );
   this.filteredLocation = this.addItemForm.get('location')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocation(value))
   );
  }

  private _filterEquipmentTypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.equipmenttypes.filter(option => option.toLowerCase().includes(filterValue));
   }
   
   private _filterBrands(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brands.filter(option => option.toLowerCase().includes(filterValue));
   }
   
   private _filterLocation(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.location.filter(option => option.toLowerCase().includes(filterValue));
   }
  loadImageFromFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
            
            console.log('Base64:', this.imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        console.log('No file selected');
    }
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
      if (this.imageUrl) {
        itemData.images = { Url: this.imageUrl };
      }
      else{
        itemData.images = {Url: ''}
      }
      this.equipmentService.addEquipment(itemData).subscribe(
        response => {
          
          this.isFetching = false;
          console.log('Item created successfully:', response);
          
          this.transactiontype = 'Added Item';
          const itemID = response.data._id;
          const transaction: Transaction = {
            transactionType: this.transactiontype,
            user:  this.checkedBy,
            role:  this.userType,
            department: itemData.department,
            location: itemData.location,
            equipmentId: itemID,
            timeStamp: new Date(),
          };
          console.log('ITEM COOOOOOOOODE', itemID);
          this.addTransactionItem(transaction);
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

  addTransactionItem(transaction: Transaction): void{
    this.equipmentService.addTransaction(transaction).subscribe(
      data => {
        console.log('Transaction submitted successfully:', data);
      },
      error => {
        console.error('Error submitting report:', error);
      }
    );
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
  loadLocationList(): void{
    this.equipmentService.getLocationList().subscribe(
      (response) => {
        this.location = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
}
