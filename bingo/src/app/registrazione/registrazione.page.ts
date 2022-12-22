import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  constructor(public database: DatabaseService) { }

  ngOnInit() {
  }

  registerUser(value: any): any{
    console.log("QUI");
    this.database.creaUtente(value.username, value.password, value.nome, value.cognome);
  }

}
