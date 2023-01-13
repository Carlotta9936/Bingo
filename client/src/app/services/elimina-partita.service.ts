import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class EliminaPartitaService {

  constructor(public database: DatabaseService, private router: Router, private socket: SocketService) { }

  //metodo che permette di annullare una partita
  cancelPartita(codice: string):void{
    this.database.eliminaPartita(codice);
    this.socket.esci(codice,(JSON.parse(localStorage.getItem('user')!)),true); //true indica che sono il proprietario
    this.router.navigate(['/tabs/tab1']);
  }
}
