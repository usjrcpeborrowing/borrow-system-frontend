import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = localStorage.getItem('token');
  activateUserSubject: Subject<any> = new Subject<any>()
  constructor(private http: HttpClient) {}

  getDeparmentFaculty(department: string, search: string) {
    let params = new HttpParams({
      fromObject: {
        department,
        search,
      },
    });
    return this.http.get<any>(environment.API_URL + '/api/users/getdepartmentfaculty', { params, headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }
  createUser(user: User): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };

    return this.http.post<any>(environment.API_URL + '/api/signup', user).pipe(
      tap((data) => console.log('User added:', data)),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
  getUsers(department: string[]): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        department,
      },
    });
    return this.http
      .get<any>(environment.API_URL + '/api/users', {
        headers: { Authorization: this.token as string },
        params,
      })
      .pipe(catchError(this.handleError));
  }

  activateUser(userId: string) {
    return this.http
      .patch<any>(
        environment.API_URL + '/api/users/activateuser/' + userId,
        {},
        {
          headers: { Authorization: this.token as string },
        }
      )
      .pipe(catchError(this.handleError));
  }

  onActivateUserSubject() {
    return this.activateUserSubject.asObservable()
  }

  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    //no patch yet
    return this.http.patch<any>(environment.API_URL + '/api/users/' + `${userId}` + `${currentPassword}`, newPassword, {
      headers: { Authorization: this.token as string }
    }).pipe(
      catchError(this.handleError)
    );
  }
}
