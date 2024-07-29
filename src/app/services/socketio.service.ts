import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  userId = JSON.parse(localStorage.getItem('user') as string)?._id as string;
  socket: Socket;
  readonly uri: string = 'ws://localhost:3000';
  constructor() {
    this.socket = io(this.uri
      // , 
      // {
      // query: {
      //   userId: this.userId
      // }
    // }
  );
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
