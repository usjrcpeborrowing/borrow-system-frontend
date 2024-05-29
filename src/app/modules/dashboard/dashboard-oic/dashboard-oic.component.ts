import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-oic',
  templateUrl: './dashboard-oic.component.html',
  styleUrls: ['./dashboard-oic.component.css']
})
export class DashboardOicComponent implements OnInit{
  showInventoryComponent: boolean = false;
  showReportsComponent: boolean = false;
  showContentTabs: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  directToInventory(): void {
    this.router.navigate(['/inventory']);
  }
  directToHistory(): void {
    this.router.navigate(['/history/oic']);
  }
  directToPeriodicInventory(): void {
    this.router.navigate(['/history/oic']);
  }
  directToManageStudents(): void {
    this.router.navigate(['/manage-students']);
  }

  showReports(): void {
    this.showReportsComponent = true;
    this.showContentTabs = false;
    this.showInventoryComponent  = false;
  }

  showStudentRequests(): void {
    this.showReportsComponent = false;
    this.showContentTabs = true;
    this.showInventoryComponent  = false;
  }
  showInventoryLevel(): void {
    this.showReportsComponent = false;
    this.showContentTabs = false;
    this.showInventoryComponent  = true;
  }
}
