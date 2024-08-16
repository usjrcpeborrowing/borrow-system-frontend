import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header-reads',
  templateUrl: './header-reads.component.html',
  styleUrls: ['./header-reads.component.css']
})
export class HeaderReadsComponent implements OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  currentUser: any;
  
  isSidebarOpen = false;

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    // if (!this.currentUser || this.currentUser.role !== 'reads') {
    //   this.router.navigate(['/']);
    // }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
    this.router.navigate(['/borrowed-list']);
  }
  reports(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/reads']);
  }
}