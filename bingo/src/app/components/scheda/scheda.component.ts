import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../../services/scheda.service';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.scss'],
})
export class SchedaComponent implements OnInit {

  numeri: number[] = [];

  constructor(public scheda: SchedaService) {
   }

  ngOnInit() {
    this.getScheda();
  }

  getScheda(): any{
    console.log("waaa")
    this.numeri = this.scheda.getNumeriCartella();
    console.log("N:" + this.numeri);
  }
}
