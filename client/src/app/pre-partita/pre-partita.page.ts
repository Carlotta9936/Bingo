import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
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

  constructor(public crea: CreaPartitaService, public elimina: EliminaPartitaService, private route: ActivatedRoute, private database: DatabaseService, private router: Router, private socket: SocketService, public alert: AlertService, public auth: AuthService) { }

  ngOnInit() {
    this.codice=this.crea.getCodiceUrl();
    this.controllaProprietario();  
    this.messaggi();
    this.socket.stanza(this.codice,this.auth.get("user"));
  }

  public controllaProprietario():void{
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

  public messaggi():void{
    this.socket.getNewMessage().subscribe((message: string) => {
      if(message!=""){
        if(message.includes("Il server si è disconnesso")){
          //se il proprietario sono io non devo avvisarmi
          if(this.proprietario==false){
            this.alert.presentAlert("il server si è disconnesso, PARTITA ANNULLATA");
            this.router.navigate(['/tabs/tab1']);
          }
        }else{
          if(message!="server: start"){
            this.messageList.push(message);
          }else{
            //controllo che i giocatori siano abbastanza per poter giocare
            if(this.database.controllaGiocatori(this.codice)==true){
              //se la partita inizia devo toglierla dall'elenco delle partite dove posso entrare
              this.startPartita=true;
              this.iniziata=true;
              this.database.eliminaPartita(this.codice);
            }else{
              if(this.proprietario==true){
                this.alert.presentAlert("non ci sono abbastanza giocatori per poter iniziare la partita. Il numero minimo è: 3");
              }
            }
          }
        }
      }
    });
    this.messageList=[];
  }

  public sendMessage():void {
    this.socket.sendMessage(this.auth.get("user")+': '+this.newMessage);
    this.newMessage = '';
  }

  public start():void{
    this.socket.sendMessage("server: start");
  }

  public esci(codice: string):void{
    this.socket.esci(codice,this.auth.get("user"),false);
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
    this.messageList=[];
  }
}
