import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  inventoryReport: InventoryReportInterface = {
    schoolYear: '',
    semester: '',
    issuer: '',
    approval: [],
    department: localStorage.getItem('currentUser.department') as string,
  };
  constructor(public dialogRef: MatDialogRef<ReportsComponent>, private inventoryReportService: InventoryReportService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      const firstName = currentUser.name.firstName;
      const lastName = currentUser.name.lastName;

      this.inventoryReport.issuer = `${firstName} ${lastName}`;
    }
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

  issueInventoryReport() {
    this.isloading = true;
    this.inventoryReportService.createInventoryReport(this.inventoryReport).subscribe((resp: any) => {
      if (resp.success) {
        this.openSnackBar(resp.message);
      } else {
        this.openSnackBar(resp.message);
      }
      this.isloading = false;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        error: true,
        message: 'Success',
      },
      duration: 2000,
    });
  }
}
