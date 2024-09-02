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
      next: (resp) => {
        this.getNotifications();
      },
    });
  }

  getNotifications() {
    this.notificationService.getNotifications(this.currentUser._id, this.limit).subscribe({
      next: (resp: any) => {
        this.notifications = resp.data;
        this.notification_count = resp.unread;

        console.log(resp);
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
}
