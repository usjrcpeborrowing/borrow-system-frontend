import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
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
  markAsViewedSubject:  Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getNotifications(userId: string, limit: number) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    let params = new HttpParams();
    params = params.append('user', userId);
    return this.http.get(environment.API_URL + '/api/notification', { params, headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateNotificationAsViewed(id: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    const update = { viewed: true };
    return this.http.patch<Response>(environment.API_URL + '/api/notification/' + id, update, { headers: headers }).pipe(catchError(this.handleError));
  }

  onMarkAsViewed() {
    return this.markAsViewedSubject.asObservable()
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
