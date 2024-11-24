import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-request-card-panel',
  templateUrl: './account-request-card-panel.component.html',
  styleUrls: ['./account-request-card-panel.component.css'],
})
export class AccountRequestCardPanelComponent implements OnInit {
  @Input() users: any[] = [];
  @Input() data: any;

  status_approved: string = 'oic_approved';
  selectAll = false;

  constructor(private userService: UserService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {}

  formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  approveUser(userId: string) {
    this.userService.activateUser(userId).subscribe({
      next: (resp) => {
        this.snackbarService.openSnackBar(resp.message, 'OK', false);
      },
      error: (err) => {
        this.snackbarService.openSnackBar(err.message, 'OK', true);
      },
      complete: () => {
        this.userService.activateUserSubject.next('');
      },
    });
  }

  updateStatus(status: string) {
    let body = {
      userIds: [this.data._id],
      status: status,
    };
    this.userService.updateUserStatusSubject.next(body);
  }
}
