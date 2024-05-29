
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/models/Pagination';
import { Report } from 'src/app/models/Reports';
import { Transaction } from 'src/app/models/Transaction';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-history-reeds',
  templateUrl: './history-reeds.component.html',
  styleUrls: ['./history-reeds.component.css']
})
export class HistoryReedsComponent implements OnInit {
  borrowedItems: boolean = false;
  reports: boolean = true;
  transaction: boolean = false;
  reportData: any[] = [];
  transactionData: any[] = [];
  accountDepartment: any = '';
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 50,
    pageSizeOption: [5, 10, 25, 50],
  };
  constructor(private equipmentServices: EquipmentService, private authService: AuthService,) {}

  ngOnInit(): void {
    
    const currentUser = this.authService.getCurrentUser();
    this.accountDepartment = currentUser?.department;

    
    this.getReports().subscribe(data => {
      const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
      
    this.reportData = sortedReports.filter((report: Report) => report.department === this.accountDepartment);
      console.log(this.reportData)
    });
    this.getTransactions().subscribe(data => {
      const sortedTransactions = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
      
      this.transactionData = sortedTransactions.filter((transaction: Transaction) => transaction.department === this.accountDepartment);
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
