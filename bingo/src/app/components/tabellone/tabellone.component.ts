import { Component, OnInit } from '@angular/core';
import { BossoloService } from 'src/app/services/bossolo.service';
import { HttpClient } from '@angular/common/http';
import { Partita } from 'src/app/interfaces/Partita';
import { TimerService } from 'src/app/services/timer.service';
import { getDatabase, ref, set } from 'firebase/database';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-tabellone',
  templateUrl: './tabellone.component.html',
  styleUrls: ['./tabellone.component.scss'],
})
export class TabelloneComponent implements OnInit {

  estratto: number=0;
  numeri: number[]=[];
  estratti: boolean[]=[];
  numeriEstratti: number = 0;

  cinquina: null | string = null;
  bingo: null | string = null;

  timeLeft: number = 3;
  interval?: any;

  

  constructor(public bossolo: BossoloService, private http: HttpClient, public timer:TimerService, public database: DatabaseService) { 
    for(let i=1;i<=90;i++){
      this.numeri.push(i);
      console.log("costruttore"+i);
    }
    this.estratti=this.bossolo.tabellone;
  }

  ngOnInit() {
    console.log("VAI");
    this.startTimer();
  }

  estrazione(): void{
    this.estratto=this.bossolo.estraiNumero();
    let stato: Partita = {
      ultimoNumero: this.estratto, 
      numeriEstratti: this.numeriEstratti+1,
      cinquina: this.cinquina,
      bingo: this.bingo
    };

    this.database.aggiornaPartita(stato);


    
    /*

    this.http.put<Partita>('https://bingo-bce96-default-rtdb.europe-west1.firebasedatabase.app/partita/'+"AAA", stato)
      .subscribe(data=> {
        console.log("D: " + data);
        data.ultimoNumero = stato.ultimoNumero;
      })

      */




      console.log("Estrazione");

    window.location.reload;
  }

  startTimer():void {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        //console.log("tempo"+this.timeLeft);
      } else {
        this.timeLeft = 3;
        this.estrazione();
      }
    },1000)
  }

  /*startTimer(): void {
    this.timer.startTimer(3);
    console.log("Estrazione");
    this.estrazione();
  }*/
}
