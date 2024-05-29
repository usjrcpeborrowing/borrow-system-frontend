import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/models/Pagination';
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
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 50,
    pageSizeOption: [5, 10, 25, 50],
  };
  constructor(private equipmentServices: EquipmentService) {}

  ngOnInit(): void {
    this.getReports().subscribe(data => {
      const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
      this.reportData = sortedReports
      console.log(this.reportData)
    });
    this.getTransactions().subscribe(data => {
      const sortedTransactions = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
      this.transactionData = sortedTransactions
      console.log(this.transactionData)
    });
  }

  getReports(): Observable<any> {
      return this.equipmentServices.getReports(this.pagination).pipe(
        catchError(error => {
          console.error('Error fetching reports:', error);
          return throwError(error);
        })
      );
  }
  getTransactions(): Observable<any> {
    return this.equipmentServices.getTransactions(this.pagination).pipe(
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
