import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(private userService: UserService, private authService: AuthService) {
    this.user = this.authService.getCurrentUser() as User;
  }
  ngOnInit(): void {
    this.userService.getUsers(this.user.department).subscribe({
      next: (resp) => (this.students = resp['data']),
      error: (err) => console.error(err.message),
    });
  }
}
