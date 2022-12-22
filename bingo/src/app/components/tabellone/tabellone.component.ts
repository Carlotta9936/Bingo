import { Component, OnInit } from '@angular/core';
import { BossoloService } from 'src/app/services/bossolo.service';

@Component({
  selector: 'app-tabellone',
  templateUrl: './tabellone.component.html',
  styleUrls: ['./tabellone.component.scss'],
})
export class TabelloneComponent implements OnInit {

  estratto: number=0;
  numeri: number[]=[];
  estratti: boolean[]=[];
  timeLeft: number = 3;
  interval?: any;
  

  constructor(public bossolo: BossoloService) { 
    for(let i=1;i<=90;i++){
      this.numeri.push(i);
      console.log("costruttore"+i);
    }
    this.estratti=this.bossolo.tabellone;
  }

  ngOnInit() {
    this.startTimer();
  }

  estrazione(): void{
    this.estratto=this.bossolo.estraiNumero();
    window.location.reload;
  }

  startTimer():void {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log("tempo"+this.timeLeft);
      } else {
        this.timeLeft = 3;
        this.estrazione();
      }
    },1000)
  }
}
