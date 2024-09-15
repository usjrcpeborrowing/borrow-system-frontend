import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  isSidebarExpanded = false;
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.currentUser = this.authService.getCurrentUser();
    // if (!this.currentUser || this.currentUser.role !== 'Student') {
    //   this.router.navigate(['/']);
    // }
  }
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
  directToInventory(): void {
    this.router.navigate(['/borrow']);
  }
  
  directToBorrowRequest(): void {
    this.router.navigate(['/student-borrowed-list']);
  }
  
  directToHistory(): void {
    this.router.navigate(['/history/student']);
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}