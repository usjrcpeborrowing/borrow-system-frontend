import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface NavigationItem {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-buttons',
  templateUrl: './dashboard-buttons.component.html',
  styleUrls: ['./dashboard-buttons.component.css']
})
export class DashboardButtonsComponent implements OnInit {

  isSidebarExpanded = false;
  currentUser: any;
  currentRole: string = '';
  navigations: { [key: string]: NavigationItem[] } = {
    administrator: [
      // { name: 'Dashboard', url: '/dashboard/admin', icon: 'home' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'check_box' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      // { name: 'Inventory Report', url: '/item-details', icon: 'assignment' },
      { name: 'Accounts', url: '/account-request', icon: 'volunteer_activism' },
      // { name: 'History', url: '/history/admin', icon: 'book' },
    ],
    oic: [
      // { name: 'Dashboard', url: '/dashboard/faculty', icon: 'home' },
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      // { name: 'Inventory Report', url: '/item-details', icon: 'assignment' },
      { name: 'Borrow Requests', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Account Request', url: '/account-request', icon: 'person_add' },
      { name: 'Manage User', url: '/student-list', icon: 'manage_accounts' },

      // { name: 'History', url: '/history/faculty', icon: 'book' },
    ],
    reads: [
      // { name: 'Dashboard', url: '/dashboard/reads', icon: 'home' },
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'assignment' },
      // { name: 'Inventory Report', url: '/item-details', icon: 'assignment' },
      { name: 'Borrow Requests', url: '/borrowed-list', icon: 'volunteer_activism' },
      { name: 'Borrow History', url: '/student-borrowed-list', icon: 'history' },
      // { name: 'History', url: '/history/reads', icon: 'book' },
    ],
    faculty: [
      // { name: 'Dashboard', url: '/dashboard/faculty', icon: 'home' },
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      // { name: 'Inventory Report', url: '/item-details', icon: 'description' },
      { name: 'Borrow Requests', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      // { name: 'History', url: '/history/faculty', icon: 'book' },
    ],
    chairman: [
      // { name: 'Dashboard', url: '/dashboard/faculty', icon: 'home' },
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      // { name: 'Inventory Report', url: '/item-details', icon: 'description' },
      { name: 'Borrow Requests', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Account Request', url: '/account-request', icon: 'person_add' },
      { name: 'Manage User', url: '/student-list', icon: 'manage_accounts' },
      // { name: 'History', url: '/history/faculty', icon: 'book' },
    ],
    student: [
      // { name: 'Dashboard', url: '/dashboard/student', icon: 'home' },
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Borrow History', url: '/student-borrowed-list', icon: 'history' },
      // { name: 'History', url: '/history/student', icon: 'book' },
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
