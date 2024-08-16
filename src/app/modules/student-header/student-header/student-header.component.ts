import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NotificationInterface } from 'src/app/models/Notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css'],
})
export class StudentHeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  currentUser: any;
  isSidebarOpen = false;
  notifications: NotificationInterface[]=[]
  constructor(private authService: AuthService, private router: Router, private socketIOService: SocketioService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getNotifications();
    this.socketIOService.listen('notification').subscribe((resp) => console.log('socket', resp));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  dashboard(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/student']);
  }

  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/borrow']);
  }

  request(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/student-borrowed-list']);
  }

  history(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/history/student']);
  }

  getNotifications() {
    this.notificationService.getNotifications(this.currentUser._id, 10).subscribe({
      next: (resp) => {
        this.notifications = resp;
      },
      error: (err)=> {
        console.error(err.message)
      }
    });
  }
}
