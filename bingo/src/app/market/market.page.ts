import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  crediti: number;

  constructor(public database: DatabaseService) {
    //+ converte in int, ! non è null
    this.crediti = +localStorage.getItem('crediti')!
  }

  ngOnInit() {
  }

  compraCartella(val: number):void{

      //Aggiungi timbra a lista timbri
      
      //Aggiorna crediti 
      this.aggiornaCrediti(val);
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

}
