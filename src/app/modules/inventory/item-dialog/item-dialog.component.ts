import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/models/Items';
import { Transaction } from 'src/app/models/Transaction';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
})
export class ItemDialogComponent implements OnInit {
  selectedFile: File | null = null;
  imageUrl: string | null = null; // Keep imageUrl as a string
  googleDriveLink: string = ''; // Keep googleDriveLink as a string

  equipmenttypes: string[] = [];
  brands: string[] = [];

  transactiontype: string = '';
  equipmentTypeControl = new FormControl();
  filteredEquipmentTypes!: Observable<string[]>; // Add ! here
  userType: any = '';
  checkedBy: any = '';
  brandControl = new FormControl();
  filteredBrands!: Observable<string[]>;
  @ViewChild('fileInput') fileInput: any;
  isEditingImage = false;
  current_data: any;
  constructor(public dialogRef: MatDialogRef<ItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Item, private equipmentService: EquipmentService, private authService: AuthService) {
    this.current_data = { ...data };
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.checkedBy = `${currentUser?.name.firstName} ${currentUser?.name.lastName}`;
    this.userType = currentUser?.role;
    this.loadEquipmentTypes();
    this.loadBrandList();
    if (!this.data.images || typeof this.data.images !== 'object') {
      this.data.images = {
        thumbnailUrl: '',
        midSizeUrl: '',
        Url: '',
      };
    }

    this.filteredEquipmentTypes = this.equipmentTypeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterEquipmentTypes(value))
    );
    this.filteredBrands = this.brandControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterBrands(value))
    );
  }
  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return !currentUser || !this.cantEditRole(currentUser.role);
  }
  private _filterEquipmentTypes(value: string): string[] {
    console.log('Filtering equipment types with value:', value);
    const filterValue = value.toLowerCase();
    const filteredOptions = this.equipmenttypes.filter((option) => option.toLowerCase().includes(filterValue));
    console.log('Filtered options:', filteredOptions);
    return filteredOptions;
  }

  private _filterBrands(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brands.filter((option) => option.toLowerCase().includes(filterValue));
  }
  private cantEditRole(role: string): boolean {
    const allowedRoles = ['faculty', 'Instructor'];
    return allowedRoles.includes(role);
  }

  loadImageFromGoogleDrive(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Directly assign the input value to googleDriveLink
    this.googleDriveLink = inputElement.value;
    const match = this.googleDriveLink.match(/\/(?:file\/d\/|thumbnail\?id=)([\w-]+)(?:\/|$)/);

    if (match) {
      const imageId = match[1];
      this.imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
      console.log('Image URL:', this.imageUrl);
      if (typeof this.data.images === 'object') {
        this.data.images.thumbnailUrl = this.imageUrl;
      } else {
        console.error('data.images is not an object:', this.data.images);
      }
    } else {
      this.imageUrl = null;
      if (typeof this.data.images === 'object') {
        this.data.images.thumbnailUrl = '';
      } else {
        console.error('data.images is not an object:', this.data.images);
      }
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
  addTransactionItem(transaction: Transaction): void {
    this.equipmentService.addTransaction(transaction).subscribe((resp) => {
      console.log('add transaction', resp);
    });
  }
  toggleEditImage(): void {
    this.isEditingImage = !this.isEditingImage;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
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
  saveChanges() {
    if (typeof this.data.images !== 'object') {
      console.error('data.images is not an object:', this.data.images);
      return;
    }
    this.data.dateAcquired = new Date();
    if (this.imageUrl) {
      this.data.images.Url = this.imageUrl;
      this.data.images.midSizeUrl = this.imageUrl;
    }
    console.log('current data', this.current_data);
    console.log('changed data', this.data);
    this.equipmentService.updateItem(this.data._id, this.data).subscribe(
      (response) => {
        if (response.success) {
          console.log('Updating item with ID:', this.data._id);
          console.log('Item updated successfully:', response.data);
          let revisions = Object.entries(this.data)
            .filter(([key, val]) => val !== this.current_data[key])
            .map((updated) => {
              let field = updated[0];
              return {
                field,
                oldValue: this.current_data[field],
                newValue: updated[1],
              };
            })
            .filter((x) => x.field !== 'dateAcquired');

          console.log(revisions);
          this.transactiontype = 'update';

          const itemID = this.data._id;
          const transaction: Transaction = {
            transactionType: this.transactiontype,
            user: this.checkedBy,
            role: this.userType,
            department: this.data.department,
            location: this.data.location,
            equipmentId: itemID,
            revision: revisions,
            timeStamp: new Date(),
          };
          console.log('ITEM COOOOOOOOODE', transaction);
          this.addTransactionItem(transaction);
          this.dialogRef.close();
        } else {
          console.log('Updating item with ID:', this.data._id);
          console.error('Error updating item:', response.message);
        }
      },
      (error) => {
        console.error('Error updating item:', error);
      }
    );
  }
}
