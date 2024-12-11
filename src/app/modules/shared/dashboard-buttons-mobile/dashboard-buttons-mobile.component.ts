
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
      { name: 'Dashboard', url: '/dashboard/admin', icon: 'home' },
      { name: 'Inventory', url: '/inventory', icon: 'menu' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'check_box' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'playlist_add_check' },
      // { name: 'Inventory Details', url: '/item-details', icon: 'assignment' },
      { name: 'Accounts', url: '/account-request', icon: 'how_to_reg' },
      { name: 'History', url: '/history/admin', icon: 'book' },
    ],
    oic: [
      { name: 'Dashboard', url: '/dashboard/faculty', icon: 'home' },
      { name: 'Browse Items', url: '/borrow', icon: 'view_module' },
      { name: 'Inventory', url: '/inventory', icon: 'inbox' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'playlist_add_check' },
      // { name: 'Inventory Details', url: '/item-details', icon: 'assignment' },
      { name: 'Student Requests', url: '/faculty-borrowed-list', icon: 'how_to_reg' },
      { name: 'History', url: '/history/faculty', icon: 'book' },
    ],
    reads: [
      { name: 'Dashboard', url: '/dashboard/reads', icon: 'home' },
      { name: 'Browse Items', url: '/borrow', icon: 'view_module' },
      { name: 'Inventory', url: '/inventory', icon: 'menu' },
      { name: 'Requests', url: '/borrowed-list', icon: 'how_to_reg' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'assignment' },
      { name: 'History', url: '/history/reads', icon: 'book' },
    ],
    faculty: [
      { name: 'Dashboard', url: '/dashboard/faculty', icon: 'home' },
      { name: 'Browse Items', url: '/borrow', icon: 'view_module' },
      { name: 'Inventory', url: '/inventory', icon: 'inbox' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'playlist_add_check' },
      // { name: 'Inventory Details', url: '/item-details', icon: 'description' },
      { name: 'Student Requests', url: '/faculty-borrowed-list', icon: 'how_to_reg' },
      { name: 'History', url: '/history/faculty', icon: 'book' },
    ],
    student: [
      { name: 'Dashboard', url: '/dashboard/student', icon: 'home' },
      { name: 'Browse Items', url: '/borrow', icon: 'view_module' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'how_to_reg' },
      { name: 'History', url: '/history/student', icon: 'book' },
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
