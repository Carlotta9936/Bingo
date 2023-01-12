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

  public stanza(room: string, nome: any):void{
    this.socket.emit('join',room, nome);
  }

  public esci(room:string, nome: any, proprietario: boolean):void{
    if(proprietario==true){
      this.socket.emit('message', "Il server si è disconnesso");
      this.socket.emit('delete',room);
    }else{
      this.socket.emit('leave',room, nome);
    }
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      console.log()
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}

  
