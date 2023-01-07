import { Component } from '@angular/core';
import { PartitaData } from '../interfaces/PartitaData';
import { CreaPartitaService } from '../services/crea-partita.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  partite: PartitaData[] = []
  partitaCercata?: PartitaData;
  searchTerm = '';

  constructor(public crea: CreaPartitaService, public database: DatabaseService) { }

  async ngOnInit(){
    //Carica tutte le partite pubbliche
    this.database.getPartite().then((value) => {
      Object.values(value).forEach((v: any) => {
        if(v.pubblica===true){
          this.partite.push({
            'codice': v.codice,
            'ip': v.ip,
            'numPartecipanti': v.numPartecipanti,
            'proprietario': v.proprietario,
            'pubblica': v.pubblica
          })
        }
      })
    });
  }

  //Cerca partita tramite codice
  public async cercaPartita(){
    this.database.getPartite().then((value) => {
      Object.values(value).forEach((v: any) => {
        if(v.codice===this.searchTerm){
          this.partitaCercata = v;
        }
      });
    });
  }

  public entra(codice: string): void{
    this.database.getPartita(codice).then((promise) => {
      try{
        let numPartecipanti= promise.numPartecipanti;
        this.database.aggiornaPartecipanti(codice, numPartecipanti+1);
      }catch (e){
        console.log("errore"+e);
      }
    });
  }
}
