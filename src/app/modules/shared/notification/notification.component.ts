import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NotificationInterface } from 'src/app/models/Notification';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnChanges {
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 10,
    pageSizeOption: [5, 10, 25, 50],
  };
  @Input() page: number = 1;
  @Input() total: number = 0;

  @Input() notifications: NotificationInterface[] = [];

  constructor(private router: Router, private notificationService: NotificationService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page']) {
      this.pagination.page = changes['page'].currentValue;
    }
    if (changes['total']) {
      this.pagination.length = changes['total'].currentValue;
    }
  }

  ngOnInit(): void {}

  markAsRead(notificationId: string) {
    this.notificationService.updateNotificationAsViewed(notificationId).subscribe({
      next: (resp) => {
        this.notificationService.markAsViewedSubject.next(true);
      },
    });
  }

  markAllAsReads() {
    this.notificationService.markAllAsReadSubject.next(true);
  }

  paginate(event: PageEvent) {
    this.notificationService.paginateNotificationSubject.next(event.pageIndex + 1);
  }
}
