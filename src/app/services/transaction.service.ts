import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransation(equipmentIds: string[]): Observable<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    let params = new HttpParams({
      fromObject: { equipmentId: equipmentIds },
    });

    return this.http.get(environment.API_URL + '/api/transaction', { params, headers }).pipe(catchError(this.handleError));
  }

  combineRevisions(revisions: any[]) {
    return revisions
      .map((rev) => {
        return rev.revision.map((x: any) => {
          let spread = { ...x, ...rev };
          delete spread.revision;
          return spread;
        });
      })
      .flat(1);
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
