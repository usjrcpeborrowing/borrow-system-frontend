import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserCategoryFilter } from 'src/app/models/UserCategoryFilter';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  openedCategory: boolean = false;
  user: User;
  students: User[] = [];
  userCategoryFilter: UserCategoryFilter = {
    search: '',
    role: '',
    status: '',
    department: [],
  };
  constructor(private userService: UserService, private authService: AuthService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService) {
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
      next: (resp) => {
        this.students = resp['data'];
        console.log(this.students.length);
      },
      error: (err) => console.error(err.message),
    });
  }

  queryParamsHandling(params: Params) {
    this.userCategoryFilter.status = params['status'] ? params['status'] : '';
    this.userCategoryFilter.department = params['department'] ? params['department'] : this.user.department;
    this.userCategoryFilter.role = params['role'] ? params['role'] : '';
    this.userCategoryFilter.search = params['search'] ? params['search'] : '';
    this.getUsers();
  }
}
