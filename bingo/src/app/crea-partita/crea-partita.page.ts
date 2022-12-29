import { Component, OnInit } from '@angular/core';
import { CreaPartitaService } from '../services/crea-partita.service';

@Component({
  selector: 'app-crea-partita',
  templateUrl: './crea-partita.page.html',
  styleUrls: ['./crea-partita.page.scss'],
})
export class CreaPartitaPage implements OnInit {

  pubblica?: boolean;
  codice: string = "";

  constructor(public crea:CreaPartitaService) { }

  ngOnInit() {
  }

  //Setta la partita in modalità pubblica
  setPublic():void {
    this.pubblica = true;
    this.creaPartitaDB();
  }
  
  //Setta la partita in modalità privata
  setPrivate(): void{
    this.pubblica = false;
    this.creaPartitaDB();
  }

  //Ritorna il codice per entrare nella stanza
  getCodice(): string {
    return this.codice;
  }

  //Crea partita del DB
  async creaPartitaDB(): Promise<void> {
    this.codice = this.crea.creaCodice();
      console.log("1")
      const ipAddress = await this.getIPAddress();
      console.log(`Your IP address is: ${ipAddress}`);

  }


  async getIPAddress(): Promise<string> {
    console.log("async")
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }
 

}
