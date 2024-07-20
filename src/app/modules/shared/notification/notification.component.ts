import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketioService } from 'src/app/services/socketio.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  
  currentUser: any;
  constructor(private socketIOService: SocketioService ,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
    this.currentUser = this.authService.getCurrentUser();
    this.socketIOService.listen('testevent').subscribe((resp) => console.log('socket', resp));
  }
  directToStudentRequest(event: Event): void {
      this.router.navigate(['/borrowed-list']);
  }
  
}
