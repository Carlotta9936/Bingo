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

  creaPartita(ip: string, proprietario: string, pubblica: boolean, cod: string): any{
    let codice= cod;
    let numPartecipanti: number= 1;
    let partita: PartitaData ={pubblica,codice,numPartecipanti,ip, proprietario};
    console.log(partita);
    this.database.creaPartita(partita);
  }


  //Crea partita del DB
  async creaPartitaDB(partita: boolean): Promise<void> {
    console.log("1")
    this.codice=this.creaCodice();
    const ipAddress = await this.getIPAddress();
    console.log(`Your IP address is: ${ipAddress}`);
    this.creaPartita(ipAddress,"a",partita,this.codice);
    }


  async getIPAddress(): Promise<string> {
    console.log("async")
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
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
    this.pubblica = true;
    this.creaPartitaDB(true);
  }

  //Setta la partita in modalità privata
  setPrivate(): void{
    this.pubblica = false;
    this.creaPartitaDB(false);
  }


  resettaCodice(): void{
    console.log("ciao");
    this.codice='';
  }
}
