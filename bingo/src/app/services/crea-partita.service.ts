import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreaPartitaService {

  constructor() { }

  //trova l'indirizzo IP
  
  //Crea codice
  creaCodice(): string{
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += this.getRandomChar();
    }

    /*
      if(codice è già presente nel DB)
        this.creaCodice();
      else{
        return result;
      }
    */

    
    return result;
  }

  getRandomChar(): string {
    const code = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    return String.fromCharCode(code);
  }
}
