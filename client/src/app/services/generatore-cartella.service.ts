import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratoreCartellaService {

  constructor() { }


  //Get numeri zero compresi
  getNumeri(): any{

  }

  //Estrazione dei numeri
  getNumeriCasuali(): number[]{
    let numeri: number[] = [Math.floor(Math.random() * (90) + 1)]; //L'array deve partire già con un numero in memoria
    for(let i=0; i<14; i++){
      let n = Math.floor(Math.random() * 90 + 1);
      if(this.controlloPresenza(numeri, n) && this.controlloDecina(numeri, n) < 3){
        numeri.push(n);
      } else {
        i--;
      }
    }
    return this.ordinaNumeri(numeri);
  }

  //Controlli per nuovo numero
  //Controllo presenza
  controlloPresenza(numeri: number[], numero: number): Boolean {
    let controllo: boolean = true;
    numeri.forEach((n: number) => {
      if(n === numero){
        controllo = false;
      }
    });
    return controllo;
  }

  //Controllo decina, non ci possono essere più di 3 numeri con la stessa decina
  //Restituisce i la quantità di altri numeri con la stessa decina
  controlloDecina(numeri: number[], numero: number): number {
    if(numero === 90){  //Dato che il 90 va nella riga dell'80 
      numero-=1;        //lo trattiamo come se fosse un 89
    }
    //i limiti sono il più grande e il più piccolo numero con quella decina
    // 65 limiteInf = 60 limiteSup = 69
    let limiteInf: number = Math.floor(numero/10)*10;
    let limiteSup: number = Math.ceil(numero/10)*10-1;
    let count: number = 0;

    numeri.forEach((n: number) => {
      if(n >= limiteInf && n <= limiteSup){
        count++;
      }
    })

    return count;
  }

  //Ordino i numeri
  ordinaNumeri(numeri: number[]): number[] {
    let numeriOrdinati: number[] = [];
    for(let i=0; i<15 ; i++){
      let indexMinore = 0
      let minore = numeri[indexMinore];
      numeri.forEach((n: number, index: number) => {
        if(n<minore){
          minore = n;
          indexMinore = index;
        }
      })

      numeriOrdinati.push(minore);
      numeri.splice(indexMinore, 1);
    }

    return numeriOrdinati;
  }

  //Aggiungi gli zeri

  //Transforma in matrice

  //Magheggi

  //Estrazione cinquine

  //Get Cartelle
  getCartella(): any {
     this.getNumeri();
  }

}
