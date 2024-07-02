import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';

interface User {
  userId: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  department: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static adminAccountId = 'admin';
  private static adminPassword = 'admin123';
  private static oicAccountId = 'oic';
  private static oicPassword = 'oic123';
  private static readsAccountId = 'reads';
  private static readsPassword = 'reads123';
  private static readscpeAccountId = 'readscpe';
  private static readscpePassword = 'readscpe123';
  private static instructorAccountId = 'instructor';
  private static instructorPassword = 'instructor123';
  private static studentAccountId = 'student';
  private static studenPasswrd = 'student123';
  // add more accounts
  constructor(private router: Router, private equipmentService: EquipmentService, private http: HttpClient) {}

  login(accountId: string, password: string): Observable<Object> {
    const body = {
      schoolId: accountId,
      password: password,
    };
    return this.http.post(environment.API_URL + '/api/login', body).pipe(catchError(this.handleError));
  }

  private fetchUserType(userId: string): Observable<string> {
    return this.equipmentService.getUserTypes().pipe(
      map((response) => {
        interface UserType {
          _id: string;
          role: string;
        }
        const userType = response.data.find((type: UserType) => type._id === userId);
        return userType ? userType.role : null;
      }),
      catchError((error) => {
        console.error('Failed to fetch user type', error);
        return throwError(() => new Error('Failed to fetch user type'));
      })
    );
  }

  navigateToDashboard(role: string): void {
    switch (role.toLowerCase()) {
      case 'student':
        this.router.navigate(['/dashboard/student']);
        break;
      case 'reads':
        this.router.navigate(['/dashboard/reads']);
        break;
      case 'instructor':
        this.router.navigate(['/dashboard/instructor']);
        break;
      case 'oic':
        this.router.navigate(['/dashboard/oic']);
        break;
      case 'admin':
      case 'administrator':
        this.router.navigate(['/dashboard/admin']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  hasAnyRoles(allowedRoles: string[], userRoles: string[]) {
    return allowedRoles.some((allowedrole) => userRoles.some((userrole) => userrole == allowedrole));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // return localStorage.getItem('currentUser') !== null;
    return localStorage.getItem('token') !== null;
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
