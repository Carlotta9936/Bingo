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
  

  constructor(public bossolo: BossoloService) { 
    for(let i=1;i<=91;i++){
      this.numeri.push(i);
    }
    this.estratti=this.bossolo.tabellone;
  }

  ngOnInit() {
  }

  estrazione(): void{
    this.estratto=this.bossolo.estraiNumero();
    window.location.reload;
  }
}
