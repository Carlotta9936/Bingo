import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timbro-seleziona',
  templateUrl: './timbro-seleziona.component.html',
  styleUrls: ['./timbro-seleziona.component.scss'],
})
export class TimbroSelezionaComponent implements OnInit {
  @Input() img?: string;
  @Input() nome?: string;
  
  constructor() { }

  ngOnInit() {}

}
