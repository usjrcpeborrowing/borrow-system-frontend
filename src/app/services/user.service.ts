import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = localStorage.getItem('token');
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

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
