import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationInterface } from 'src/app/models/Notification';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() notifications: NotificationInterface[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(){
    this.router.navigate(['faculty-borrowed-list'])
  }
}
