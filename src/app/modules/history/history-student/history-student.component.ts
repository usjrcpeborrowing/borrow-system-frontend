import { Component } from '@angular/core';

@Component({
  selector: 'app-history-student',
  templateUrl: './history-student.component.html',
  styleUrls: ['./history-student.component.css']
})
export class HistoryStudentComponent {
  
  borrowedItems: boolean = false;
  reports: boolean = true;

  showBorrow(): void {
    this.borrowedItems = true;
    this.reports = false;
  }

  showReports(): void {
    this.borrowedItems = false;
    this.reports = true;
  }
}
