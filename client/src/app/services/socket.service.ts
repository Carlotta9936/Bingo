import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  socket = io('http://localhost:3000');


  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public stanza(room: string):void{
    this.socket.emit('join',room);
  }

  public esci():void{
    this.socket.emit('disconnect');
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      console.log()
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}

  
