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

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  checkedBy: string = ''; // Checked By value
  isloading: boolean = false;
  equipmentTypeControl = new FormControl();
  filteredEquipmentTypes!: Observable<string[]>; // Add ! here

  brandControl = new FormControl();
  filteredBrands!: Observable<string[]>;

  isFetching: boolean = true;
  imageUrl: any = null;
  googleDriveLink: string = '';

  userDepartment: any = '';
  userType: any = '';
  equipmenttypes: string[] = [];

  location: string[] = [];

  locationControl = new FormControl();
  filteredLocation!: Observable<string[]>;
  brands: string[] = [];
  transactiontype: string = '';
  matters: string[] = Constants.equipmentMatterType;
  currentUser: any;
  // remarks: Remark[] = [
  //   { value: 'Functional', viewValue: 'Functional' },
  //   { value: 'Defective', viewValue: 'Defective' },
  //   { value: 'Turnover', viewValue: 'Turnover' },
  // ];
  remarks: string[] = Constants.equipmentStatus;
  inventorytypes: string[] = Constants.equipmentInventoryType;

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
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      equipmentType: ['', Validators.required],
      brand: ['', Validators.required],
      matter: ['', Validators.required],
      serialNo: [''],
      modelNo: ['', Validators.required],
      inventorytype: ['', Validators.required],
      color: ['', Validators.required],
      condition: ['', Validators.required],
      checkedBy: ['', Validators.required],
      location: ['', Validators.required],
      department: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      isborrow: [true, Validators.required],
      // images: this.fb.array([])
      images: this.fb.group({
        url: [''],
        thumbnailUrl: [''],
        midSizeUrl: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userDepartment = this.currentUser?.department[0];
    this.checkedBy = `${this.currentUser?.firstName} ${this.currentUser?.lastName}`;
    this.userType = this.currentUser?.role;
    this.addItemForm.get('checkedBy')?.setValue(this.currentUser._id);
    this.loadEquipmentTypes();
    this.loadBrandList();
    this.loadLocationList();
    this.filteredEquipmentTypes = this.addItemForm.get('equipmentType')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterEquipmentTypes(value))
    );
    this.filteredBrands = this.addItemForm.get('brand')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterBrands(value))
    );
    this.filteredLocation = this.addItemForm.get('location')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterLocation(value))
    );

    this.equipmentService.onAddEquipmentImage().subscribe({
      next: (resp) => {
        // console.log(resp);
        // (this.addItemForm.get('images') as FormArray).push(this.fb.control(resp));
        (this.addItemForm.controls['images'] as FormGroup).controls['url'].setValue(resp);
        console.log(this.addItemForm);
      },
    });
  }

  private _filterEquipmentTypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.equipmenttypes.filter((option) => option.toLowerCase().includes(filterValue));
  }

  private _filterBrands(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brands.filter((option) => option.toLowerCase().includes(filterValue));
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

    // const inputElement = event.target as HTMLInputElement;
    // if (inputElement.files && inputElement.files.length > 0) {
    //   const file = inputElement.files[0];
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     this.imageUrl = e.target.result;

    //     console.log('Base64:', this.imageUrl);
    //   };
    //   reader.readAsDataURL(file);
    // } else {
    //   console.log('No file selected');
    // }
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
          if (resp.success) {
            this.transactiontype = 'add';
            const itemID = resp.data._id;

            const transaction: Transaction = {
              transactionType: this.transactiontype,
              user: this.checkedBy,
              role: this.userType,
              department: itemData.department,
              location: itemData.location,
              revision: [],
              equipmentId: itemID,
              timeStamp: new Date(),
            };

            this.addTransactionItem(transaction);
          }
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
        this.location = resp.data;
        this.addItemForm.get('location')?.setValue('');
      },
    });
  }
}
