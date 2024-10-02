import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  userId = JSON.parse(localStorage.getItem('user') as string)?._id as string;
  socket: Socket;
  readonly uri: string = environment.SOCKET_URI;
  constructor() {
    this.socket = io(this.uri, {
      query: {
        userId: this.userId,
      },
    });
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: string) {
    this.socket.emit(eventName, { message: data });
  }
}
