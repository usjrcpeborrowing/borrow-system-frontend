import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketioService } from 'src/app/services/socketio.service';
@Component({
  selector: 'app-header-oic',
  templateUrl: './header-oic.component.html',
  styleUrls: ['./header-oic.component.css'],
})
export class HeaderOicComponent implements OnInit {
  currentUser: any;
  notification_count: number = 0;
  notification_messages: string[] = [];
  constructor(private authService: AuthService, private router: Router, private socketIOService: SocketioService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.socketIOService.listen('notification').subscribe({
      next: (resp) => {
        this.notification_count += 1;
        this.notification_messages.push(resp as string);
      },
    });
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
  dashboard(event: Event): void {
    event.preventDefault();
    const userRole = this.currentUser.role;

    let dashboardRoute = '/dashboard/oic';

    this.router.navigate([dashboardRoute]);
  }
  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inventory']);
  }

  history(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/history/oic']);
  }
  requests(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/oic']);
  }
  reports(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/oic']);
  }
  students(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/manage-students']);
  }
}
