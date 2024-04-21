import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
interface User {
    userId: string;
    password: string;
    name:{
        firstName: string;
        lastName: string;
    }
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private static adminAccountId = 'admin';
    private static adminPassword = 'admin123';
    private static oicAccountId    = 'oic';
    private static oicPassword = 'oic123';
    private static readsAccountId    = 'reads';
    private static readsPassword = 'reads123';
    private static instructorAccountId    = 'instructor';
    private static instructorPassword = 'instructor123';
    private static studentAccountId    = 'student';
    private static studenPasswrd = 'student123';
    // add more accounts
    constructor(private router: Router, private equipmentService: EquipmentService) {}

    login(accountId: string, password: string): Observable<boolean> {
        if (accountId === AuthService.adminAccountId && password === AuthService.adminPassword) {
            const adminUser: User = {
                userId: accountId,
                password: password,
                name: {
                    firstName: 'Admin',
                    lastName: 'Admin'
                },
                role: 'Admin'
            };
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            this.navigateToDashboard(adminUser.role);
            return of(true);
        }
        
        if (accountId === AuthService.readsAccountId && password === AuthService.readsPassword) {
            const userAcc: User = {
                userId: accountId,
                password: password,
                name: {
                    firstName: 'reads',
                    lastName: 'reads'
                },
                role: 'reads'
            };
            console.log(userAcc.name.firstName);
            localStorage.setItem('currentUser', JSON.stringify(userAcc));
            this.navigateToDashboard(userAcc.role);
            return of(true);
        }
        if (accountId === AuthService.studentAccountId && password === AuthService.studenPasswrd) {
            const userAcc: User = {
                userId: accountId,
                password: password,
                name: {
                    firstName: 'Student',
                    lastName: 'Student'
                },
                role: 'Student'
            };
            localStorage.setItem('currentUser', JSON.stringify(userAcc));
            this.navigateToDashboard(userAcc.role);
            return of(true);
        }
        if (accountId === AuthService.oicAccountId && password === AuthService.oicPassword) {
            const userAcc: User = {
                userId: accountId,
                password: password,
                name: {
                    firstName: 'oic',
                    lastName: 'account'
                },
                role: 'oic'
            };
            localStorage.setItem('currentUser', JSON.stringify(userAcc));
            this.navigateToDashboard(userAcc.role);
            return of(true);
        }
        if (accountId === AuthService.instructorAccountId && password === AuthService.instructorPassword) {
            const userAcc: User = {
                userId: accountId,
                password: password,
                name: {
                    firstName: 'instructor',
                    lastName: 'account'
                },
                role: 'Instructor'
            };
            localStorage.setItem('currentUser', JSON.stringify(userAcc));
            this.navigateToDashboard(userAcc.role);
            return of(true);
        }
        return this.equipmentService.getUsers().pipe(
            switchMap(response => {
                const users = response.data;
                console.log('All users:', users);
                const user = users.find((u: User) => u.userId === accountId);
                if (user) {
                    return this.fetchUserType(user.role).pipe(
                        map(role => {
                            user.role = role;
                            console.log('Identified role:', role);
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            this.navigateToDashboard(user.role);
                            return true;
                        }),
                        catchError(error => {
                            console.error('Failed to fetch user type', error);
                            return of(false);
                        })
                    );
                } else {
                    return of(false);
                }
            }),
            catchError(error => {
                console.error('Login failed', error);
                return throwError(() => new Error('Login failed'));
            })
        );
    }

    private fetchUserType(userId: string): Observable<string> {
        return this.equipmentService.getUserTypes().pipe(
            map(response => {
                interface UserType {
                    _id: string;
                    role: string;
                }

                const userType = response.data.find((type: UserType) => type._id === userId);
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
            case 'Admin':
                this.router.navigate(['/dashboard/admin']);
                break;
            default:
                this.router.navigate(['/dashboard']);
        }
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
        return localStorage.getItem('currentUser') !== null;
    }

    
}
