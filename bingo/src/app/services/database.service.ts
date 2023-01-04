import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Partita } from '../interfaces/Partita';
import { collection, doc, docData, Firestore, query, where, getDocs} from '@angular/fire/firestore';
import { DataServiceService } from './data-service.service';
import { getDatabase, set, ref, onValue, remove} from "firebase/database";
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
  public creaUtente(username: string, password: string, nome: string, cognome: string, ){
    set(ref(this.database, 'users/'+username), {
      username: username,
      password: password,
      nome: nome,
      cognome: cognome,
      crediti: 50
    });
    alert('user created');
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

  public getUser(user: any): any {
    onValue(user, (snapshot) => {
      console.log("User  " + user)
      const u = snapshot.val();
      console.log(u);
      return u;
    }); 
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

  public creaPartita(partita: PartitaData){
    set(ref(this.database, 'partita/'+partita.codice),{
      pubblica: partita.pubblica,
      codice: partita.codice,
      numPartecipanti: partita.numPartecipanti,
      ip: partita.ip,
      proprietario: partita.proprietario
    });
  }

  public eliminaPartita(cod: string){
    const partitaRef = ref(this.database, 'partita/'+cod);
    // Delete the file
    remove(partitaRef).then(() => {
    // File deleted successfully
      console.log("eliminato: "+cod);
    }).catch((error) => {
    // Uh-oh, an error occurred!
      console.log("errore");
    });
  }

  
}
