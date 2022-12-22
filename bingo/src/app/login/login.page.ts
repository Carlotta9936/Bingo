import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public database: DatabaseService) { }

  ngOnInit() {
  }

  login(value: any){
    let user = this.database.login(value.username, value.password).then((response) => {
      if(response !== null){
        console.log("Trovato");
      } else {
        console.log("Non trovato");
      }
    });
  }
}
