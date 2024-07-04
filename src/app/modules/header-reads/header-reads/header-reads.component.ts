import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-reads',
  templateUrl: './header-reads.component.html',
  styleUrls: ['./header-reads.component.css']
})
export class HeaderReadsComponent implements OnInit{
  currentUser: any;

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    // if (!this.currentUser || this.currentUser.role !== 'reads') {
    //   this.router.navigate(['/']);
    // }
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
  dashboard(event: Event): void {
    
    event.preventDefault();
    let dashboardRoute = '/dashboard/reads';
    
    this.router.navigate([dashboardRoute]);
  }
  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inventory']);
  }
  
  history(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/history/reads']);
  }
  requests(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/reads']);
  }
  reports(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/reads']);
  }
}