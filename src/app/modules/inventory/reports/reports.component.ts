import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { InventoryReportInterface } from 'src/app/models/InventoryReport';
import { InventoryReportService } from 'src/app/services/inventory-report.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  inventoryReport: InventoryReportInterface = {
    schoolYear: '',
    semester: '',
    department: '',
    approval: [],
  };
  constructor(

    public dialogRef: MatDialogRef<ReportsComponent>,
    private inventoryReportService: InventoryReportService
  ) {}

  ngOnInit(): void {

  }
}
