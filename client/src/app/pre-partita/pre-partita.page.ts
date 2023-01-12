import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreaPartitaService } from '../services/crea-partita.service';
import { DatabaseService } from '../services/database.service';
import { EliminaPartitaService } from '../services/elimina-partita.service';
import { SocketService } from '../services/socket.service';

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
  newMessage?: string;
  messageList: string[] = [];

  constructor(public crea: CreaPartitaService, public elimina: EliminaPartitaService, private route: ActivatedRoute, private database: DatabaseService, private router: Router, private socket: SocketService) { }

  ngOnInit() {
    this.codice=this.crea.getCodiceUrl();
    this.controllaProprietario();  
    this.socket.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
    this.socket.stanza(this.codice,JSON.parse(localStorage.getItem('user')!));
  }

  public controllaProprietario():void{
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

  public sendMessage():void {
    this.socket.sendMessage(JSON.parse(localStorage.getItem('user')!)+': '+this.newMessage);
    this.newMessage = '';
  }

  public start():void{
    this.startPartita=true;
    this.iniziata=true;
  }

  public esci(codice: string):void{
    this.socket.esci(codice,(JSON.parse(localStorage.getItem('user')!)));
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
