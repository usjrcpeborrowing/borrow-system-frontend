import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryReportInterface } from '../models/InventoryReport';

@Injectable({
  providedIn: 'root',
})
export class InventoryReportService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getInventoryReport() {
    const headers = {
      Authorization: this.token as string,
    };
    return this.http.get(environment.API_URL + '/api/inventoryreport', { headers }).pipe(catchError(this.handleError));
  }

  createInventoryReport(inventoryReport: InventoryReportInterface) {
    const headers = {
      Authorization: this.token as string,
    };

    return this.http.post(environment.API_URL + '/api/inventoryreport', inventoryReport, {}).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
