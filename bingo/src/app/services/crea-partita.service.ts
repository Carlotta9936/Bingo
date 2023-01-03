import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { PartitaData } from '../interfaces/PartitaData';

@Injectable({
  providedIn: 'root'
})
export class CreaPartitaService {

  pubblica?: boolean;
  codice: string = "";


  constructor(public database: DatabaseService) { }

  creaPartita(ip: string, proprietario: string, pubblica: boolean): any{
    let codice= this.creaCodice();
    let numPartecipanti: number= 1;
    let partita: PartitaData ={pubblica,codice,numPartecipanti,ip, proprietario};
    this.database.creaPartita(partita);
  }
  
  //Crea codice
  creaCodice(): string{
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += this.getRandomChar();
    }

    /*
      if(codice è già presente nel DB)
        this.creaCodice();
      else{
        return result;
      }
    */
    return result;
  }

  getRandomChar(): string {
    const code = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    return String.fromCharCode(code);
  }


  //Setta la partita in modalità pubblica
  setPublic():void {
    console.log("pubblica");
    this.pubblica = true;
    this.codice=this.creaCodice();
  }

  //Setta la partita in modalità privata
  setPrivate(): void{
    this.pubblica = false;
    this.codice=this.creaCodice();
    console.log("privata");
  }

  resettaCodice(): void{
    console.log("ciao");
    this.codice='';
  }
}
