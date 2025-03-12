import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationInterface } from 'src/app/models/Notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
interface NavigationItem {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  notifications: NotificationInterface[] = [];
  limit: number = 10;
  page: number = 1;
  total: number = 0;
  notification_count: number = 0;
  notification_messages: string[] = [];
  navigations: { [key: string]: NavigationItem[] } = {
    administrator: [
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Requests', url: '/faculty-borrowed-list', icon: 'check_box' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      { name: 'Accounts', url: '/account-request', icon: 'volunteer_activism' },
    ],
    oic: [
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      { name: 'Borrow Request', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Account Request', url: '/account-request', icon: 'person_add' },
      { name: 'Manage User', url: '/student-list', icon: 'manage_accounts' },
      { name: 'Approval Request', url: '/oic-borrowed-list', icon: 'volunteer_activism' },
    ],
    reads: [
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'assignment' },
      { name: 'Borrow Request', url: '/borrowed-list', icon: 'volunteer_activism' },
      { name: 'Borrow History', url: '/student-borrowed-list', icon: 'history' },
    ],
    faculty: [
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      { name: 'Borrow Requests', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
    ],
    chairman: [
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Inventory', url: '/inventory', icon: 'handyman' },
      { name: 'Inventory Request', url: '/inventory-equipment-request', icon: 'note_add' },
      { name: 'Borrow Request', url: '/faculty-borrowed-list', icon: 'volunteer_activism' },
      { name: 'Account Request', url: '/account-request', icon: 'person_add' },
      { name: 'Manage User', url: '/student-list', icon: 'manage_accounts' },
      { name: 'Approval Request', url: '/oic-borrowed-list', icon: 'volunteer_activism' },
    ],
    student: [
      { name: 'Borrow Items', url: '/borrow', icon: 'shopping_cart' },
      { name: 'Borrow History', url: '/student-borrowed-list', icon: 'history' },
    ],
  };
  currentNavigations: any[] = [];
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private socketIOService: SocketioService,
    private notificationService: NotificationService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.updateNavigations();

    this.socketIOService.listen('notification').subscribe({
      next: (resp) => {
        this.notification_count += 1;
      },
    });

    this.getNotifications();

    this.notificationService.onMarkAsViewed().subscribe({
      next: (resp) => this.getNotifications(),
    });

    this.notificationService.onPaginateNotification().subscribe({
      next: (resp) => {
        this.page = resp;
        this.getNotifications();
      },
    });

    this.notificationService.onMarkAllAsRead().subscribe((resp) => {
      this.notificationService.updateAllNotificationsAsViewed(this.currentUser._id).subscribe({
        next: (resp) => {
          this.getNotifications();
        },
      });
    });
  }

  getNotifications() {
    this.notificationService.getNotifications(this.currentUser._id, this.page, this.limit).subscribe({
      next: (resp: any) => {
        this.notifications = resp.data;
        this.notification_count = resp.unread;
        this.total = resp.total;
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
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    const userId = this.authService.getCurrentUser()?._id as string;
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.userService.changePassword(userId, resp.currentPassword, resp.newPassword).subscribe({
          next: (resp) => {
            this.snackbarService.openSnackBar(resp.message, 'OK');
          },
          error: (err) => {
            this.snackbarService.openSnackBar(err.message, 'OK');
          },
        });
      }
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isSidebarExpanded = false;

  toggleSidebar(expanded: boolean): void {
    this.isSidebarExpanded = expanded;
  }
}
