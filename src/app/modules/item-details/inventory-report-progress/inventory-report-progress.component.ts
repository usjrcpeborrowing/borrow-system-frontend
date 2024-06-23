import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InventoryReportInterface } from 'src/app/models/InventoryReport';

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
  ngOnChanges(changes: SimpleChanges): void {
    this.issuedBy = this.inventoryReport?.issuedBy['firstName'] + ' ' + this.inventoryReport?.issuedBy['lastName'];
  }
}
