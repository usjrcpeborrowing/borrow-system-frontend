import { Component } from '@angular/core';

@Component({
  selector: 'app-history-admin',
  templateUrl: './history-admin.component.html',
  styleUrls: ['./history-admin.component.css']
})
export class HistoryAdminComponent {
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
