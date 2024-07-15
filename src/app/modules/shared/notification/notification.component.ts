import { Component, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private socketIOService: SocketioService) {}

  ngOnInit(): void {
    this.socketIOService.listen('testevent').subscribe((resp) => console.log('socket', resp));
  }
}
