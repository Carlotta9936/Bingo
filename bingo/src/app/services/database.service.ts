import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { DataServiceService } from './data-service.service';
import { getDatabase, set, ref, onValue } from "firebase/database";
import { Observable } from 'rxjs';
import { PartitaData } from '../interfaces/PartitaData';
import { serialize } from 'v8';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  users?: User[];
  database;

  constructor(private firestore: Firestore, private dataService: DataServiceService) { 
    this.database = getDatabase();
  }

  creaUtente(username: string, password: string, nome: string, cognome: string){
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
    const user = ref(this.database, 'users/'+ username);
    onValue(user, (snapshot) => {
      const u = snapshot.val();
      console.log(u);
      return u;
    });

  } 
}
