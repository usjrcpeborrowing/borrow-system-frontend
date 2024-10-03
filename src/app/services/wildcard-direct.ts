import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-wildcard-redirect',
    template: '',
})
export class WildcardRedirectComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
        const userRoles = localStorage.getItem('roles') !== null ? JSON.parse(localStorage.getItem('roles') as string) : [];
        let redirectTo = '/dashboard';
        if (userRoles.includes('student')) {
            // redirectTo = '/dashboard/student';
            redirectTo = '/borrow';
        } else if (userRoles.includes('reads')) {
            // redirectTo = '/dashboard/reads';
            redirectTo = '/inventory';
        } else if (userRoles.includes('faculty')) {
            // redirectTo = '/dashboard/faculty';
            redirectTo = '/borrow';
        } else if (userRoles.includes('oic')) {
            // redirectTo = '/dashboard/oic';
            redirectTo = '/inventory';
        } else if (userRoles.includes('administrator')) {
            // redirectTo = '/dashboard/admin';
            redirectTo = '/inventory';
        }
            this.router.navigate([redirectTo]);
        } else {
            this.router.navigate(['/landing-page']);
        }
    }
}
