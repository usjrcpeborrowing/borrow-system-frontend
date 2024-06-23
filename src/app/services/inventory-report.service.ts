import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryReportService {
  constructor(private http: HttpClient) {}

  getInventoryReport() {
    return this.http.get(environment.API_URL + '/api/inventoryreport').pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
