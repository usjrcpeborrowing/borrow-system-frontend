import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-student-list-card',
  templateUrl: './student-list-card.component.html',
  styleUrls: ['./student-list-card.component.css']
})
export class StudentListCardComponent {
 @Input() students: User[] = []
}
