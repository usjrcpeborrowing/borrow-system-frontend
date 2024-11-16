import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

interface UserWithSelection extends User {
  selected: boolean;
}

@Component({
  selector: 'app-student-list-card',
  templateUrl: './student-list-card.component.html',
  styleUrls: ['./student-list-card.component.css'],
})
export class StudentListCardComponent {
  @Input() students: User[] = [];
  selected: string[] = [];

  constructor(private userService: UserService) {}

  onCheckBoxChanged(event: MatCheckboxChange, studentId: string) {
    if (event.checked) {
      this.selected.push(studentId);
    } else {
      let ndx = this.selected.indexOf(studentId);
      this.selected.splice(ndx, 1);
    }
  }

  updateStatus(status: string) {
    let body = {
      userIds: this.selected,
      status: status,
    };
    this.userService.updateUserStatusSubject.next(body);
  }
}
