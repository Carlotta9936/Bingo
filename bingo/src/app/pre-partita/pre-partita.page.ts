import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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
  startPartita:boolean=false;
  iniziata: boolean=false;

  constructor(public crea: CreaPartitaService, public elimina: EliminaPartitaService, private route: ActivatedRoute, private database: DatabaseService, private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.codice=this.crea.getCodiceUrl();
    this.controllaProprietario(this.crea.username);
  }

  public controllaProprietario(user: string):void{
    this.database.getPartita(this.codice).then((promise) => {
      try{
        this.userProprietario=promise.proprietario;
        if(promise.proprietario==this.auth.get("user")){
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

  public start():void{
    this.startPartita=true;
    this.iniziata=true;
  }

  public esci(codice: string):void{
    //chiamata al db per prendere il numero dei partecipanti
    this.database.getPartita(codice).then((promise) => {
      try{
        let numPartecipanti= promise.numPartecipanti;
        //aggiorno il numero dei partecipanti
        this.database.aggiornaPartecipanti(codice, numPartecipanti-1);
        this.router.navigate(['/tabs/tab1']);
      }catch (e){
        console.log("errore"+e);
      }
    });
  }
}
