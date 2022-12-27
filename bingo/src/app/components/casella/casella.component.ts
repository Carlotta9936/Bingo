import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Casella } from 'src/app/interfaces/Casella';

@Component({
  selector: 'app-casella',
  templateUrl: './casella.component.html',
  styleUrls: ['./casella.component.scss'],
})
export class CasellaComponent implements OnInit {
  @Input() numero?: number;
  @Input() stato?: "vuota" | "numero" | "estratta" | "segnata";

  @Output() segnato = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {}

  segna(): void {
    this.stato = "segnata";
    this.mandaSegnato();
  }

  mandaSegnato(){
    this.segnato.emit(this.numero);
  }

}
