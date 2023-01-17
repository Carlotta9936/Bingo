import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scelta-timbro',
  templateUrl: './scelta-timbro.component.html',
  styleUrls: ['./scelta-timbro.component.scss'],
})
export class SceltaTimbroComponent implements OnInit {

  @Input() url?: string;
  constructor() { }

  ngOnInit() {}

}
