import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header-oic',
  templateUrl: './header-oic.component.html',
  styleUrls: ['./header-oic.component.css']
})
export class HeaderOicComponent implements OnInit{
  currentUser: any;

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    // this.currentUser = this.authService.getCurrentUser();
    // if (!this.currentUser || this.currentUser.role !== 'oic') {
    //   this.router.navigate(['/']);
    // }
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
  dashboard(event: Event): void {
    
    event.preventDefault();
    const userRole = this.currentUser.role;

    let dashboardRoute = '/dashboard/default';
    if (userRole === 'oic') {
      dashboardRoute = '/dashboard/oic';
    }
    this.router.navigate([dashboardRoute]);
  }
  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inventory']);
  }
  
  history(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/history/oic']);
  }
  requests(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/oic']);
  }
  reports(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/oic']);
  }
  students(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/manage-students']);
  }
}