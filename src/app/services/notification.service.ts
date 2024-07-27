import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationInterface } from '../models/Notification';
interface Response {
  data: NotificationInterface[];
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  token = localStorage.getItem('token');
  headers = {
    Authorization: this.token as string,
  };
  constructor(private http: HttpClient) {}

  getNotifications(userId: string, limit: number): Observable<NotificationInterface[]> {
    let params = new HttpParams();
    params = params.append('user', userId);
    return this.http.get<Response>(environment.API_URL + '/api/notification', { params, headers: this.headers }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
