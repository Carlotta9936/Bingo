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

  constructor(public crea: CreaPartitaService, public database: DatabaseService) {
    
 
    //let p = JSON.parse(partiteDB);
    console.log("p", typeof(this.partite));
  }

  async ngOnInit(){
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


  prova():void{
    console.log("prova");
  }

  public async chiamaPartite(){

  }

  public async cercaPartita(){
    this.database.getPartite().then((value) => {
      Object.values(value).forEach((v: any) => {
        if(v.codice===this.searchTerm){
          this.partitaCercata = v;
        }
      });
    });
  }
  

}
