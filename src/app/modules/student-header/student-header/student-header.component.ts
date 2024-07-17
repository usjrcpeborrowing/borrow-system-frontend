import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  currentUser: any;
  
  isSidebarOpen = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // if (!this.currentUser || this.currentUser.role !== 'Student') {
    //   this.router.navigate(['/']);
    // }
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  dashboard(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/student']);
  }

  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/borrow']);
  }

  request(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/student-borrowed-list']);
  }

  history(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/history/student']);
  }
}
