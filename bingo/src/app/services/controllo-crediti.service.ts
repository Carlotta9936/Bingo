import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ControlloCreditiService {

  constructor(public database: DatabaseService) { }

  //Recupera i crediti di un utente
  prendiCrediti(){
    console.log("crediti"+localStorage.getItem('crediti'));
    return +localStorage.getItem('crediti')!
  }


  //controllo per autorizzare la transazione
  autorizzaOperazione(prezzo: number): boolean{
    //Controllo se l'utente si può permettere l'operazione
    if(this.prendiCrediti()>=prezzo){
      this.aggiornaCrediti(prezzo);
      return true;
    } else {
      return false;
    }
  }

  aggiornaCrediti(val: number): void{
    let newCrediti = this.prendiCrediti() - val
    //Aggiornare DB
    this.database.aggiornaCrediti(localStorage.getItem('user')!, newCrediti);
    //Aggiornare local data
    localStorage.setItem("crediti", ""+newCrediti);
  }
}
