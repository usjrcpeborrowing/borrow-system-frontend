
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.css']
})
export class AccountRequestComponent implements OnInit {
  @Input() users: any[] = [];
  openedCategory: boolean = false;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });

  }

  fetchUserList(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        if (response && Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          console.error('Data is not an array:', response);
          this.users = [];
        }
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }
  


  queryParamsHandling(params: Params) {
    this.fetchUserList();
  }
}
