import { Component, OnInit } from '@angular/core';
import { CreaPartitaService } from '../services/crea-partita.service';

@Component({
  selector: 'app-crea-partita',
  templateUrl: './crea-partita.page.html',
  styleUrls: ['./crea-partita.page.scss'],
})
export class CreaPartitaPage implements OnInit {

  
  

  constructor(public crea:CreaPartitaService) { }

  ngOnInit() {
  }

  /*
  //Setta la partita in modalità pubblica
  setPublic():void {
    this.pubblica = true;
    this.creaPartitaDB();
    console.log("pubblica");
  }
  
  //Setta la partita in modalità privata
  setPrivate(): void{
    this.pubblica = false;
    this.creaPartitaDB();
    console.log("privata");
  }

  //Ritorna il codice per entrare nella stanza
  getCodice(): string {
    return this.codice;
  }

  ciao(): void{
    console.log("ciao");
  }

  //Crea partita nel DB
  creaPartitaDB(): void {
    this.codice = this.crea.creaCodice();
  }*/
}
