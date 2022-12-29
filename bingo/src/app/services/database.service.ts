import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Partita } from '../interfaces/Partita';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { DataServiceService } from './data-service.service';
import { getDatabase, set, ref, onValue } from "firebase/database";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { PartitaData } from '../interfaces/PartitaData';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  users?: User[];
  database;

  constructor(private firestore: Firestore, private dataService: DataServiceService) { 
    this.database = getDatabase();
  }


  //Metodi per Utenti
  creaUtente(username: string, password: string, nome: string, cognome: string, ){
    set(ref(this.database, 'users/'+username), {
      username: username,
      password: password,
      nome: nome,
      cognome: cognome,
      crediti: 50
    });
    alert('user created');
  }

  creaPartita(partita: PartitaData){
    set(ref(this.database, 'partita/'+partita.codice),{
      pubblica: partita.pubblica,
      codice: partita.codice,
      numPartecipanti: partita.numPartecipanti,
      ip: partita.ip,
      proprietario: partita.proprietario
    });
    alert('partita creata');
  }

  async login(username: string, password: string): Promise<any>{    
    const user = await ref(this.database, 'users/'+ username);

    onValue(user, (snapshot) => {
      console.log("USer" + user)
      const u = snapshot.val();
      console.log(u);
      return u;
    }); 

  } 

  getUser(user: any): any {
    onValue(user, (snapshot) => {
      console.log("User  " + user)
      const u = snapshot.val();
      console.log(u);
      return u;
    }); 
  }

  //Metodi per dati partita


  //Metodi per partita
  public aggiornaPartita(partita: Partita): void{
    set(ref(this.database, 'game/'+'AAA'), {
      ultimoNumero: partita.ultimoNumero, 
      numeriEstratti: partita.numeriEstratti+1,
      cinquina: partita.cinquina,
      bingo: partita.bingo
    })
  }

  
}
