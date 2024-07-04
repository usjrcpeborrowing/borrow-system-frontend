import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-reeds',
  templateUrl: './dashboard-reeds.component.html',
  styleUrls: ['./dashboard-reeds.component.css']
})
export class DashboardReedsComponent implements OnInit{

  showReportsComponent: boolean = false;
  showContentTabs: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  directToInventory(): void {
    this.router.navigate(['/inventory']);
  }
  directToHistory(): void {
    this.router.navigate(['/history/reads']);
  }
  directToItemDetails(): void {
    this.router.navigate(['/item-details']);
  }
  directToPeriodicInventory(): void {
    this.router.navigate(['/history/reads']);
  }

  showReports(): void {
    this.showReportsComponent = true;
    this.showContentTabs = false;
  }

  showStudentRequests(): void {
    this.showReportsComponent = false;
    this.showContentTabs = true;
  }
}
