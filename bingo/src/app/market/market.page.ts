import { Component, OnInit } from '@angular/core';
import { Timbro } from '../interfaces/Timbro';
import { DatabaseService } from '../services/database.service';
import { TimbriService } from '../services/timbri.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  crediti: number;
  timbriAcq: Timbro[] = [];

  constructor(public database: DatabaseService, public timbri: TimbriService) {
    //+ converte in int, ! non è null
    this.crediti = +localStorage.getItem('crediti')!
  }

  ngOnInit() {
    this.getTimbri();
  }

  compraTimbro(idTimbro: number, crediti: number):void{
      //Aggiungi timbra a lista timbri
      //console.log("T", idTimbro)
      this.timbri.aggiungiTimbro("Alsi", idTimbro)
      //Aggiorna crediti 
      this.aggiornaCrediti(crediti);

      window.location.reload();
    }

  aggiornaCrediti(val: number): void{
    //Aggiornare DB
    this.database.aggiornaCrediti("Alsi", this.crediti - val);
    //Aggiornare local data
    this.aggiornaLocalStorage(val);
  }

  aggiornaLocalStorage(val: number): void{
    this.crediti = +localStorage.getItem('crediti')!
    this.crediti -= val;
    localStorage.setItem("crediti", ""+this.crediti);
  }

  getTimbri(): any{
    this.timbri.nonAppartiene("Alsi").then((value: Timbro[]) => {
      console.log("Value", value);
      this.timbriAcq = value;
      console.log("Timbri", this.timbriAcq);
    });
  }

}
