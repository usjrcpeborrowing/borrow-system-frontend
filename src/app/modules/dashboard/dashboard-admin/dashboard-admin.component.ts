import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit{
  showReportsComponent: boolean = false;
  showContentTabs: boolean = true;
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  directToInventory(): void {
    this.router.navigate(['/inventory']);
  }
  directToItemDetails(): void {
    this.router.navigate(['/item-details']);
  }
  directToHistory(): void {
    this.router.navigate(['/history/admin']);
  }
  directToAccounts(): void {
    this.router.navigate(['/account-manager']);
  }
  directToSettings(): void {
    this.router.navigate(['/settings']);
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
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