import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Casella } from 'src/app/interfaces/Casella';
import { Partita } from 'src/app/interfaces/Partita';
import { BossoloService } from 'src/app/services/bossolo.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SocketService } from 'src/app/services/socket.service';
import { GeneratoreCartellaService } from 'src/app/services/generatore-cartella.service';
import { SchedaService } from '../../../services/scheda.service';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.scss'],
})
export class SchedaComponent implements OnInit {

  numeri: number[] = [];
  caselle: Casella[] = [];

  timeLeft: number = 3;
  interval?: any;

  constructor(public scheda: SchedaService, public generatore: GeneratoreCartellaService, private http: HttpClient, public database: DatabaseService, public bossolo: BossoloService) {
  }

  ngOnInit() {
    this.getScheda();
    console.log("topolno");
    this.listenNumero();
    //this.caselle = this.aggiungiVuote(this.numeri);
    //this.startTimer();
  }

  getScheda(): any{
    this.numeri = this.generatore.getCartella();
    console.log(this.numeri);
    this.numeri.forEach(n => {
      let casella: Casella = {
        numero: n, 
        stato: "numero"
      };
      this.caselle.push(casella);
    });
      //console.log("casella", );
      //console.log("CC" + this.caselle);
  }

  aggiungiVuote(numeri: number[]): any{

  }

  getCartella(): any {
    /*this.numeri.forEach(n => {
      let casella: Casella = {
        numero: n, 
        stato: "numero"
      };
      //console.log("casella", );
      //this.caselle.push({numero: n, stato: "numero"});
      this.caselle = this.caselle.concat(casella);
    })*/
  }

  //Timer per chiamare le API per controllare il nuovo numero estratto
  startTimer():void {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        //console.log("tempo"+this.timeLeft);
      } else {
        this.timeLeft = 1;
        this.ascoltaNumero();
      }
    },1000)
  }

  //Chiama le API dell'url per controllare l'ultimo numero estratto
  ascoltaNumero(): any {
   /* this.http.get<any>('https://bingo-bce96-default-rtdb.europe-west1.firebasedatabase.app/game/AAA')
    .subscribe(data => {
      console.log("Data: " + data)

    });
    let n = this.database.ascoltaNumero('AAA');
    //console.log(n);
    this.controllaNumero(n);
    /*this.http.get<Partita>('http://localhost:3000/partita')
      .subscribe(result => this.controllaNumero(result.ultimoNumero))*/
  }

  //Controlla se l'ultimo numero estratto è presente nella cartella
  controllaNumero(numero: any): void {
    //console.log("numero"+numero);
    this.caselle.forEach(casella => {
      if(casella.numero === numero && casella.stato==="numero"){
        console.log("Ce  l'hai")
        casella.stato = "estratta";
      }
    });

  }

  public listenNumero():void{
    //this.controllaNumero(this.bossolo.estratto).subscribe();
    let obs=this.bossolo.ritornaNumero();
    obs.subscribe((estratto)=>{
              console.log("number"+estratto);
        this.controllaNumero(Number(estratto));
    });
    /*obs.subscribe((estratto: number)=>{
      //next(estratto){
        console.log("number"+estratto);
        this.controllaNumero(estratto);
      //}
      
    });
    /*this.socket.getNewMessage().subscribe((message: string) => {
      console.log("messaggio"+message);
      if(message.includes("Estratto")){
        let messaggio = message.split(": ");
      }
    });*/
  }


  onCasellaSegnata(value: any): void{
    console.log(value);
    this.numeri.forEach((numero: number, index: number) => {
      if(numero === value){
        this.numeri.splice(index, 1);
        if(this.numeri.length===0){
          this.bingo();
        }
      }
    })
  }

  bingo(): void {
    //Dovrà abilitare il bottone bingo
    console.log("BINGOOOOOO");
  }
  
}
