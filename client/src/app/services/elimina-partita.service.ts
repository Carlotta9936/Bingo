import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { SocketService } from '../services/socket.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EliminaPartitaService {

  constructor(public database: DatabaseService, private router: Router, private socket: SocketService, public auth: AuthService) { }

  //metodo che permette di annullare una partita
  cancelPartita(codice: string):void{
    this.socket.esci(codice,(this.auth.get("user")),true); //true indica che sono il proprietario
    this.database.eliminaPartita(codice);
    this.router.navigate(['/tabs/tab1']);
  }
}
