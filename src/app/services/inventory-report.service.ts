import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryReportInterface } from '../models/InventoryReport';

@Injectable({
  providedIn: 'root',
})
export class InventoryReportService {

  constructor(private http: HttpClient) {}

  getInventoryReport() {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http.get(environment.API_URL + '/api/inventoryreport', { headers }).pipe(catchError(this.handleError));
  }

  createInventoryReport(inventoryReport: InventoryReportInterface) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };

    return this.http.post(environment.API_URL + '/api/inventoryreport', inventoryReport, { headers }).pipe(catchError(this.handleError));
  }

  updateInventoryReport(inventoryReportId: string, role: string, status: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http.patch(environment.API_URL + '/api/inventoryreport/' + inventoryReportId, { role, status }, { headers }).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
