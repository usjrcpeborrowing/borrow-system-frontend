import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-history-admin',
  templateUrl: './history-admin.component.html',
  styleUrls: ['./history-admin.component.css']
})
export class HistoryAdminComponent implements OnInit {
  borrowedItems: boolean = false;
  reports: boolean = true;
  transaction: boolean = false;
  reportData: any[] = [];
  transactionData: any[] = [];

  constructor(private equipmentServices: EquipmentService) {}

  ngOnInit(): void {
      this.getReports().subscribe(data => {
        const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
        this.reportData = sortedReports
      });
      this.getTransactions().subscribe(data => {
        const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
        this.transactionData = sortedReports
      });
  }

  getReports(): Observable<any> {
      return this.equipmentServices.getReports().pipe(
        catchError(error => {
          console.error('Error fetching reports:', error);
          return throwError(error);
        })
      );
  }
  getTransactions(): Observable<any> {
    return this.equipmentServices.getTransactions().pipe(
      catchError(error => {
        console.error('Error fetching reports:', error);
        return throwError(error);
      })
    );
}



  showBorrow(): void {
    this.borrowedItems = true;
    this.reports = false;
    this.transaction = false;
  }

  showReports(): void {
    this.borrowedItems = false;
    this.reports = true;
    this.transaction = false;
  }
  showTransactions(): void {
    this.borrowedItems = false;
    this.reports = false;
    this.transaction = true;
  }
}
