import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreaPartitaService } from '../services/crea-partita.service';
import { DatabaseService } from '../services/database.service';
import { EliminaPartitaService } from '../services/elimina-partita.service';

@Component({
  selector: 'app-pre-partita',
  templateUrl: './pre-partita.page.html',
  styleUrls: ['./pre-partita.page.scss'],
})
export class PrePartitaPage implements OnInit {

  codice?:any;
  proprietario?:boolean;
  userProprietario?:string;

  constructor(public crea: CreaPartitaService, public elimina: EliminaPartitaService, private route: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit() {
    this.codice=this.crea.getCodiceUrl();
    this.controllaProprietario(this.crea.username);
  }

  public controllaProprietario(user: string):void{
    this.database.getPartita(this.codice).then((promise) => {
      try{
        this.userProprietario=promise.proprietario;
        if(promise.proprietario==JSON.parse(localStorage.getItem('user')!)){
          this.proprietario=true;
        }else{
          this.proprietario=false;
        }
        console.log(this.proprietario);
      }catch (e){
        console.log("errore"+e);
      }
    });
  }
}
