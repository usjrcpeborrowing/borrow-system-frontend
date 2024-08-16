
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-faculty',
  templateUrl: './dashboard-faculty.component.html',
  styleUrls: ['./dashboard-faculty.component.css']
})
export class DashboardFacultyComponent implements OnInit{
  
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.currentUser = this.authService.getCurrentUser();
    // if (!this.currentUser || this.currentUser.role !== 'Student') {
    //   this.router.navigate(['/']);
    // }
  }
  directToInventory(): void {
    this.router.navigate(['/borrow']);
  }
  
  directToBorrowRequest(): void {
    this.router.navigate(['/faculty-borrowed-list']);
  }
  
  directToHistory(): void {
    this.router.navigate(['/history/student']);
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}