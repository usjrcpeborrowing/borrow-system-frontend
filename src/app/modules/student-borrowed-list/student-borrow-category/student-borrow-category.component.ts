

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { DepartmentService } from 'src/app/services/department.services';
import { EquipmentService } from 'src/app/services/equipment.service';


interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-student-borrow-category',
  templateUrl: './student-borrow-category.component.html',
  styleUrls: ['./student-borrow-category.component.css']
})
export class StudentBorrowCategoryComponent implements OnInit {

  itemStatus: string[] = [];
  filterForm: FormGroup;
  status: Status[] = [];

  constructor(
    private location: Location,
    private equipmentService: EquipmentService,
    private borrowedItemService: BorrowedItemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      equipmenttype: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadItemStatus();
  }

  loadItemStatus(): void {
    this.borrowedItemService.getBorrowedItemStatuses().subscribe(
      (statuses: string[]) => {
        // Use a Set to remove duplicates
        const uniqueStatuses = Array.from(new Set(statuses));
        this.status = uniqueStatuses.map(status => ({
          value: status,
          viewValue: this.formatStatus(status)
        }));
      },
      (error) => {
        console.error('Error loading item statuses:', error);
      }
    );
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
