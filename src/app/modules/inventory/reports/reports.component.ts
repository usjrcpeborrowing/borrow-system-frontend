import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryReportInterface } from 'src/app/models/InventoryReport';
import { InventoryReportService } from 'src/app/services/inventory-report.service';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [],
})
export class ReportsComponent implements OnInit {
  isloading: boolean = false;
  schoolYears: string[] = [];
  semester: string[] = ['1st', '2nd', 'summer'];
  user = JSON.parse(localStorage.getItem('user') as string);
  inventoryReport: InventoryReportInterface = {
    _id: '',
    schoolYear: '',
    semester: '',
    issuer: '',
    approval: [],
    department: '',
  };
  inventoryReportForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ReportsComponent>, private inventoryReportService: InventoryReportService, private _snackBar: MatSnackBar, private fb: FormBuilder) {
    this.inventoryReportForm = this.fb.group({
      schoolYear: ['', Validators.required],
      semester: ['', Validators.required],
      issuer: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
      issuedBy: [this.user._id, Validators.required],
      department: [this.user.department.shift(), Validators.required],
    });
  }

  ngOnInit(): void {
    // let user = JSON.parse(localStorage.getItem('user') as string);
    // this.inventoryReport.issuer = user.firstName + ' ' + user.lastName;
    // this.inventoryReport.department = user.department;
    this.generateYearRanges(2024, 5);
  }

  generateYearRanges(startYear: number, range: number) {
    let x = 0;

    while (x < range) {
      let start = startYear - range / 2 + x;
      let end = start + 1;
      this.schoolYears.push(`${Math.round(start)} - ${Math.round(end)}`);
      x++;
    }
  }

  selectRange(event: MatSelectChange) {}

  onSubmit() {
    if (this.inventoryReportForm.valid) {
      this.isloading = true;
      this.inventoryReportService.createInventoryReport(this.inventoryReportForm.value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.openSnackBar(resp.message);
        },
        error: (err: any) => {
          console.log(err);
          this.openSnackBar('Error');
        },
        complete: () => {
          this.isloading = false;
          this.dialogRef.close();
        },
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        error: true,
        message: message,
      },
      duration: 4000,
    });
  }
}
