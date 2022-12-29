import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { getDatabase, set, ref, onValue } from "firebase/database";
import { response } from 'express';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  db;

  constructor(public database: DatabaseService, public http: HttpClient) { 
    this.db = getDatabase();
  }

  ngOnInit() {
  }

  async login(value: any){
    /*let url = await ref(this.db, 'users/'+ value.username);
    let user = this.database.getUser(url).then((response: any) => {
      console.log(response);
    });*/

    this.http.get('https://bingo-bce96-default-rtdb.europe-west1.firebasedatabase.app/Users/' + value.username).subscribe(data => {
      console.log("D" + data);
    })
    //console.log("-->"  + user);
    
     
    /*let user = await this.database.login(value.username, value.password).then((response) => {
      if(response !== null){
        if(response.password === value.password){
          console.log("Trovato");
        }
      } else {
        console.log("Non trovato");
      }
    });*/
  }
}
