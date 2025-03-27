
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface NavigationItem {
  name: string;
  url: string;
  icon: string;
  label: string;
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
      { name: 'Inventory', url: '/inventory', icon: 'handyman', label: '' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'check_box', label: '' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add', label: '' },
      { name: 'Accounts', url: '/account-request', icon: 'volunteer_activism', label: '' },
    ],
    oic: [
      { name: 'Borrowing System', label: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', label: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Updates', label: 'Inventory Update Approval', url: '/inventory-equipment-request', icon: 'handyman' },
      { name: 'Borrow Request Approval (Faculty)', label: 'Borrow Request Approval (Faculty)', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Borrow Request Approval (OIC)', label: 'Borrow Request Approval (OIC/Chairman)', url: '/oic-borrowed-list', icon: 'volunteer_activism' },
      { name: 'My Borrowed Items', label: 'My  Borrowed Items', url: '/student-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Account Request Approval', label: 'Account Request Approval', url: '/account-request', icon: 'manage_accounts' },
      { name: 'Account Management', label: 'Account Management', url: '/student-list', icon: 'manage_accounts' },
    ],
    reads: [
      { name: 'Borrowing System', label: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', label: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Updates', label: 'Inventory Update Approval', url: '/inventory-equipment-request', icon: 'handyman' },
      { name: 'Borrow Requests', label: 'Borrow Requests', url: '/borrowed-list', icon: 'volunteer_activism' },
      { name: 'My Borrowed Items', label: 'My  Borrowed Items', url: '/student-borrowed-list', icon: 'volunteer_activism' },
    ],
    faculty: [
      { name: 'Borrowing System', label: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Borrow Request Approval (Faculty)', label: 'Borrow Request Approval (Faculty)', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'My Borrowed Items', label: 'My  Borrowed Items', url: '/student-borrowed-list', icon: 'volunteer_activism' },
    ],
    chairman: [
      { name: 'Borrowing System', label: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', label: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Updates', label: 'Inventory Update Approval', url: '/inventory-equipment-request', icon: 'handyman' },
      { name: 'Borrow Request Approval (Faculty)', label: 'Borrow Request Approval (Faculty)', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Borrow Request Approval (OIC)', label: 'Borrow Request Approval (OIC/Chairman)', url: '/oic-borrowed-list', icon: 'volunteer_activism' },
      { name: 'My Borrowed Items', label: 'My  Borrowed Items', url: '/student-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Account Request Approval', label: 'Account Request Approval', url: '/account-request', icon: 'manage_accounts' },
      { name: 'Account Management', label: 'Account Management', url: '/student-list', icon: 'manage_accounts' },
    ],
    student: [
      { name: 'Borrowing System', label: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'My Borrowed Items', label: 'My  Borrowed Items', url: '/student-borrowed-list', icon: 'volunteer_activism' },
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
