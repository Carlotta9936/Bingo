import { Component } from '@angular/core';
import { CreaPartitaService } from '../services/crea-partita.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public crea: CreaPartitaService) {}

  prova():void{
    console.log("prova");
  }

  

}
