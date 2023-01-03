import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Partita } from '../interfaces/Partita';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { DataServiceService } from './data-service.service';
import { getDatabase, set, ref, onValue } from "firebase/database";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { PartitaData } from '../interfaces/PartitaData';
import { Observable } from 'rxjs';

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

  /*

  login(username: string, password: string): Observable<User>{   
    const user = ref(this.database, 'users/'+ username);
      onValue(user, (snapshot) => {
        //console.log("USer" + user)
        return snapshot.val();
    /*
    return new Promise(resolve => {
      const user = ref(this.database, 'users/'+ username);
      onValue(user, (snapshot) => {
        //console.log("USer" + user)
        const u = snapshot.val();
        try{
          console.log(u)
          if(u.password === password){
            return u;
          } 
        } catch(e){
        }
        return null;
      }); 
      
    })
    

  } 
*/
  getUser(user: any): any {
    onValue(user, (snapshot) => {
      console.log("User  " + user)
      const u = snapshot.val();
      console.log(u);
      return u;
    }); 
  }

  //Metodi per dati partita
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

  //Metodi per partita
  public aggiornaPartita(partita: Partita): void{
    set(ref(this.database, 'game/'+'AAA'), {
      ultimoNumero: partita.ultimoNumero, 
      numeriEstratti: partita.numeriEstratti+1,
      cinquina: partita.cinquina,
      bingo: partita.bingo
    })
  }


  public ascoltaNumero(codicePartita: string): any {
    const partita = ref(this.database, 'game/' + codicePartita)
    onValue(partita, (snapshot) => {
      const match = snapshot.val();
      return match.ultimoNumero;
    })
  }
  
}
