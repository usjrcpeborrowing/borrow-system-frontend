import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationInterface } from 'src/app/models/Notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() notifications: NotificationInterface[] = [];

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {}

  markAsRead(notificationId: string) {
    this.notificationService.updateNotificationAsViewed(notificationId).subscribe({
      next: (resp) => {
        this.notificationService.markAsViewedSubject.next(true);
      },
    });
  }
}
