
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard-buttons',
  templateUrl: './dashboard-buttons.component.html',
  styleUrls: ['./dashboard-buttons.component.css']
})
export class DashboardButtonsComponent  implements OnInit{
  
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
  directToDashboard():void{
    this.router.navigate(['/dashboard/faculty']);
  }
  directToBorrow(): void {
    this.router.navigate(['/borrow']);
  }
  
  directToInventory(): void {
    this.router.navigate(['/inventory']);
  }
  directToItemDetails(): void {
    this.router.navigate(['/item-details']);
  }
  
  directToInventoryRequest(): void {
    this.router.navigate(['/inventory-equipment-request']);
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