import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-casella',
  templateUrl: './casella.component.html',
  styleUrls: ['./casella.component.scss'],
})
export class CasellaComponent implements OnInit {
  @Input() numero: number = 0;
  @Input() stato: "vuota" | "numero" | "estratta" | "segnata" = "vuota";

  constructor() { }

  ngOnInit() {}

}
