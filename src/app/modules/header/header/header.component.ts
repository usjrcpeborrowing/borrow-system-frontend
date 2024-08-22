import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

import { MatDialog } from '@angular/material/dialog';
interface NavigationItem {
  name: string;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  notification_count: number = 0;
  notification_messages: string[] = [];
  navigations: { [key: string]: NavigationItem[] } = {
    administrator: [
      { name: 'Dashboard', url: '/dashboard/admin' },
      { name: 'Inventory', url: '/inventory' },
      { name: 'Requests', url: '/faculty-borrowed-list' },
      { name: 'Accounts', url: '/account-request' },
      { name: 'History', url: '/history/admin' },
    ],
    oic: [
      { name: 'Dashboard', url: '/dashboard/oic' },
      { name: 'Inventory', url: '/inventory' },
      { name: 'Requests', url: '/faculty-borrowed-list' },
      { name: 'Accounts', url: '/account-request' },
      { name: 'History', url: '/history/oic' },
    ],
    reads: [
      { name: 'Dashboard', url: '/dashboard/reads' },
      { name: 'Inventory', url: '/inventory' },
      { name: 'Requests', url: '/borrowed-list' },
      { name: 'History', url: '/history/reads' },
    ],
    faculty: [
      { name: 'Dashboard', url: '/dashboard/faculty' },
      { name: 'Browse Items', url: '/borrow' },
      { name: 'Requests', url: '/faculty-borrowed-list' },
      { name: 'History', url: '/history/faculty' },
    ],
    student: [
      { name: 'Dashboard', url: '/dashboard/student' },
      { name: 'Browse Items', url: '/borrow' },
      { name: 'Requests', url: '/faculty-borrowed-list' },
      { name: 'History', url: '/history/student' },
    ],
  };
  currentNavigations: any[] = [];
  constructor(
    public dialog: MatDialog,
    private authService: AuthService, 
    private router: Router, 
    private socketIOService: SocketioService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.updateNavigations();

    this.socketIOService.listen('notification').subscribe({
      next: (resp) => {
        this.notification_count += 1;
        this.notification_messages.push(resp as string);
      },
    });
  }

  updateNavigations(): void {
    const user = this.authService.getCurrentUser();
    if (user && Array.isArray(user.role) && user.role.length > 0) {
      const primaryRole = user.role[0];
      if (this.navigations[primaryRole]) {
        this.currentNavigations = this.navigations[primaryRole];
      } else {
        this.currentNavigations = [];
      }
    } else {
      this.currentNavigations = [];
    }
  }
  
  changePassword(event: Event): void {
    console.log('view');
    this.dialog.open(ChangePasswordComponent, {
      height: '55vh',
      width: '30vw',
    });
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
