import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreaPartitaService } from '../services/crea-partita.service';
import { EliminaPartitaService } from '../services/elimina-partita.service';

@Component({
  selector: 'app-pre-partita',
  templateUrl: './pre-partita.page.html',
  styleUrls: ['./pre-partita.page.scss'],
})
export class PrePartitaPage implements OnInit {

  codice?:any;

  constructor(public crea: CreaPartitaService, public elimina: EliminaPartitaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.codice=this.crea.getCodiceUrl();
    console.log("codiceurl"+this.codice);
  }
}
