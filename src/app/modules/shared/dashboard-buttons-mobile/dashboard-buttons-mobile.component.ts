
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface NavigationItem {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-buttons-mobile',
  templateUrl: './dashboard-buttons-mobile.component.html',
  styleUrls: ['./dashboard-buttons-mobile.component.css']
})
export class DashboardButtonsMobileComponent implements OnInit {

  isSidebarExpanded = false;
  currentUser: any;
  currentRole: string = '';
  navigations: { [key: string]: NavigationItem[] } = {
    administrator: [
      { name: 'Dashboard', url: '/dashboard/admin', icon: 'menu' },
      { name: 'Inventory', url: '/inventory', icon: 'menu' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'menu' },
      { name: 'Accounts', url: '/account-request', icon: 'menu' },
      { name: 'History', url: '/history/admin', icon: 'menu' },
    ],
    oic: [
      { name: 'Dashboard', url: '/dashboard/oic', icon: 'menu' },
      { name: 'Inventory', url: '/inventory', icon: 'menu' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'menu' },
      { name: 'Accounts', url: '/account-request', icon: 'menu' },
      { name: 'History', url: '/history/oic', icon: 'menu' },
    ],
    reads: [
      { name: 'Dashboard', url: '/dashboard/reads', icon: 'menu' },
      { name: 'Browse Items', url: '/borrow', icon: 'inbox' },
      { name: 'Inventory', url: '/inventory', icon: 'menu' },
      { name: 'Requests', url: '/borrowed-list', icon: 'menu' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'assignment' },
      { name: 'History', url: '/history/reads', icon: 'menu' },
    ],
    faculty: [
      { name: 'Dashboard', url: '/dashboard/faculty', icon: 'menu' },
      { name: 'Browse Items', url: '/borrow', icon: 'inbox' },
      { name: 'Inventory', url: '/inventory', icon: 'inbox' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'assignment' },
      { name: 'Inventory Details', url: '/item-details', icon: 'assignment' },
      { name: 'Student Requests', url: '/faculty-borrowed-list', icon: 'assignment' },
      { name: 'History', url: '/history/faculty', icon: 'menu' },
    ],
    student: [
      { name: 'Dashboard', url: '/dashboard/student', icon: 'menu' },
      { name: 'Browse Items', url: '/borrow', icon: 'menu' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'menu' },
      { name: 'History', url: '/history/student', icon: 'menu' },
    ],
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.currentRole = this.currentUser.role[0];
      console.log('Current Role:', this.currentRole);
    } else {
      console.log('No user logged in');
    }
  }
  

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
