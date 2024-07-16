import { Component } from '@angular/core';

@Component({
  selector: 'app-student-borrowed-list',
  templateUrl: './student-borrowed-list.component.html',
  styleUrls: ['./student-borrowed-list.component.css']
})
export class StudentBorrowedListComponent {

  
  openedCategory: boolean = false;
  categoryClicked() {
    this.openedCategory = !this.openedCategory;
  }
} 
