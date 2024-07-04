import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getTransation(equipmentIds: string[]): Observable<any> {
    let params = new HttpParams({
      fromObject: { equipmentId: equipmentIds },
    });

    const headers = {
      Authorization: this.token as string,
    };
    return this.http.get(environment.API_URL + '/api/transaction', { params, headers }).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
