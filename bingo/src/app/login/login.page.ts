import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

import { getDatabase, set, ref, onValue } from "firebase/database";
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase/auth';
//import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  db;

  constructor(public database: DatabaseService, public http: HttpClient, private Auth:AuthService, private router: Router) { 
    this.db = getDatabase();
  }

  ngOnInit() {
  }

  async login(value: any){
    const user = ref(this.db, 'users/'+ value.username);
    onValue(user, (snapshot) => {
      try{
        let u = snapshot.val();
        if(u.password === value.password){
          console.log("Trovato");
          this.Auth.set('user', u);
          this.router.navigate(['/tabs/tab3']);
        } else {
          console.log("NOn trovato");
        }
      } catch(e){
        console.log("NOn trovato");
      }
    });

/*
    this.database.login(value.username, value.password).then((response: any) => {
      console.log("Login");
      console.log("RESPONSE: " + response);
      if(response !== null){
        //if(response.password === value.password){
          console.log("Trovato");
        //}
      } else {
        console.log("Non trovato");
      }
    });*/
    //})


      //.subscribe((response: User) => {
        
  }
}
