import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { getDatabase, set, ref, onValue } from "firebase/database";
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  db;
  user?: User;

  constructor(public database: DatabaseService, public http: HttpClient) { 
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
          this.user = u;
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
