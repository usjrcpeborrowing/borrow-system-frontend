import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
interface User {
    schoolId: string;
    password: string;
    name:{
        firstName: string;
        lastName: string;
    }
    department: string;
    role: string[];
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router, private equipmentService: EquipmentService) {}
    private loginUrl = environment.API_URL + '/api/login'; // Adjusted to match your API endpoint

    login(schoolId: string, password: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, { schoolId, password }).pipe(
            map(user => {
                localStorage.setItem('authTokenUser', user.token); // Store the token
                localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
                console.log("role", user.data.role);
                this.navigateToDashboard('administrator');
                return true;
            }),
            catchError(error => {
                console.error('Login failed', error);
                return throwError(() => new Error('Login failed'));
            })
        );
    }
    // login(schoolId: string, password: string): Observable<boolean> {

    //     return this.equipmentService.getUsers().pipe(
    //         switchMap(response => {
    //             const users = response.data;
    //             console.log('All users:', users);
    //             const user = users.find((u: User) => u.schoolId === schoolId);
    //             const pass = users.find((u: User) => u.password === password);

    //             if (user && pass) {
    //                 return this.fetchUserType(user.role).pipe(
    //                     map(role => {
    //                         user.role = role;
    //                         console.log('Identified role:', role);
    //                         console.log('TOKEN' , user.token);
    //                         localStorage.setItem('currentUser', JSON.stringify(user));
    //                         this.navigateToDashboard(user.role);
    //                         return true;
    //                     }),
    //                     catchError(error => {
    //                         console.error('Failed to fetch user type', error);
    //                         return of(false);
    //                     })
    //                 );
    //             } else {
    //                 return of(false);
    //             }
    //         }),
    //         catchError(error => {
    //             console.error('Login failed', error);
    //             return throwError(() => new Error('Login failed'));
    //         })
    //     );
    // }

    private fetchUserType(schoolId: string): Observable<string> {
        return this.equipmentService.getUserTypes().pipe(
            map(response => {
                interface UserType {
                    _id: string;
                    role: string;
                }
                const userType = response.data.find((type: UserType) => type._id === schoolId);
                return userType ? userType.role : null;
            }),
            catchError(error => {
                console.error('Failed to fetch user type', error);
                return throwError(() => new Error('Failed to fetch user type'));
            })
        );
    }

    private navigateToDashboard(role: string): void {
        switch (role) {
            case 'Student':
                this.router.navigate(['/dashboard/student']);
                break;
            case 'reads':
                this.router.navigate(['/dashboard/reads']);
                break;
            case 'Instructor':
                this.router.navigate(['/dashboard/instructor']);
                break;
            case 'oic':
                this.router.navigate(['/dashboard/oic']);
                break;
            case 'administrator':
                this.router.navigate(['/dashboard/administrator']);
                break;
            default:
                this.router.navigate(['/dashboard']);
        }
    }
    // private navigateToDashboard(roles: string[]): void {
    //     // Define the priority of roles
    //     const priorityRoles = ['administrator', 'Instructor', 'reads', 'oic', 'faculty', 'Student'];
    
    //     // Iterate through the priority roles
    //     for (const role of priorityRoles) {
    //         // Check if the roles array contains the current priority role
    //         if (roles.includes(role)) {
    //             // Construct the navigation path based on the role
    //             const path = ['/dashboard/' + role.toLowerCase()];
    //             this.router.navigate(path);
    //             return; // Exit the function once a matching role is found
    //         }
    //     }
    
    //     // Default navigation if none of the priority roles match
    //     this.router.navigate(['/dashboard/default']); // Adjust the default path as needed
    // }
    
    getCurrentUser(): User | null {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }
    logout(): void {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    
}
