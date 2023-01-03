import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class EliminaPartitaService {

  constructor(public database: DatabaseService) { }

  //metodo che permette di annullare una partita
  cancelPartita(codice: string):void{
    this.database.eliminaPartita(codice);
    //manca disconnettere gli utenti dalla partita
  }
}
