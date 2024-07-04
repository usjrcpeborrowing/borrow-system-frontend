import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-inventory-report-progress',
  templateUrl: './inventory-report-progress.component.html',
  styleUrls: ['./inventory-report-progress.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class InventoryReportProgressComponent implements OnChanges {
  @Input() inventoryReport: any;
  issuedBy: string = '';
  
  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }
  user = JSON.parse(localStorage.getItem('user') as string)
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.inventoryReport)
    this.issuedBy = this.inventoryReport?.issuedBy['firstName'] + ' ' + this.inventoryReport?.issuedBy['lastName'];
  }

  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to approve this report?',
        buttonText: {
          ok: 'Approve',
          cancel: 'Cancel'
        }
      }
    });
    
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Report Confirmed', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }
  rejectDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to reject this report?',
        buttonText: {
          ok: 'Reject',
          cancel: 'Cancel'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Report Confirmed', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }
}
