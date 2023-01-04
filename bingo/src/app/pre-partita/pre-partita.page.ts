import { Component, OnInit } from '@angular/core';
import { CreaPartitaService } from '../services/crea-partita.service';
import { EliminaPartitaService } from '../services/elimina-partita.service';

@Component({
  selector: 'app-pre-partita',
  templateUrl: './pre-partita.page.html',
  styleUrls: ['./pre-partita.page.scss'],
})
export class PrePartitaPage implements OnInit {

  constructor(public crea: CreaPartitaService, public elimina: EliminaPartitaService) { }

  ngOnInit() {
  }

}
