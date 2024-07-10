import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.services';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-borrow-category',
  templateUrl: './borrow-category.component.html',
  styleUrls: ['./borrow-category.component.css']
})
export class BorrowCategoryComponent implements OnInit {
  
  filterForm: FormGroup;
  constructor(
    private location: Location ,
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private fb: FormBuilder
    ) {
      this.filterForm = this.fb.group({
      equipmenttype: new FormControl('')
    })
  }

  
  ngOnInit(): void {
  }

  options = [
    {value: 'option1', viewValue: 'Option 1'},
    {value: 'option2', viewValue: 'Option 2'}
  ];
}
