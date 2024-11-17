import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserCategoryFilter } from 'src/app/models/UserCategoryFilter';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.css'],
})
export class AccountRequestComponent implements OnInit {
  @Input() users: any[] = [];
  openedCategory: boolean = false;
  userCategoryFilter: UserCategoryFilter = {
    search: '',
    role: '',
    status: 'pending_approval',
    department: [],
  };
  user: User;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService, private authService: AuthService) {
    this.user = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.userService.onUpdateUserStatus().subscribe({
      next: (resp) => {
        this.userService.updateUserStatus(resp.userIds, resp.status).subscribe({
          next: (resp) => {
            if (resp.success) {
              this.snackbarService.openSnackBar(resp.message, 'Done');
            }
          },
          complete: () => this.getUsers(),
        });
      },
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
  }

  getUsers(): void {
    this.userService.getUsers(this.userCategoryFilter).subscribe({
      next: (resp) => (this.users = resp['data']),
      error: (err) => console.error(err.message),
    });
  }
  queryParamsHandling(params: Params) {
    this.userCategoryFilter.status = params['status'] ? params['status'] : 'pending_approval';
    this.userCategoryFilter.department = this.user.department;
    this.userCategoryFilter.role = params['role'] ? params['role'] : '';
    this.userCategoryFilter.search = params['search'] ? params['search'] : '';
    this.getUsers();
  }
}
