import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = next.data['roles'] as string[];
    let userRoles = localStorage.getItem('roles') !== null ? JSON.parse(localStorage.getItem('roles') as string) : [];

    if (this.authService.isLoggedIn() && this.authService.hasAnyRoles(allowedRoles, userRoles)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
