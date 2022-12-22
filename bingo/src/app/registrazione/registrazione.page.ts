import { Component, OnInit } from '@angular/core';
import { Database, set, ref, update } from '@angular/fire/database'; 

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  constructor(public database: Database) { }

  ngOnInit() {
  }

  registerUser(value: any): any{
    set(ref(this.database, 'users/' + value.username), {
      username: value.username,
      password: value.password,
      nome: value.nome,
      cognome: value.cognome,
      crediti: 0,
    })
  }


}
