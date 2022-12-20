import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedaService {

  constructor() { }

  getNumeriCartella(): any{
    let numeri: number[] = [Math.floor(Math.random() * (90) + 1)];
    for(let i=0; i<14; i++){
      let n = Math.floor(Math.random() * (90) + 1);
      if(this.controllaPresenza(numeri, n) && this.controllaDecina(numeri, n)){
        numeri.push(n);
      } else {
        i--;
      }
    }

    console.log(numeri);
    return this.getNumeriOrdinati(numeri);

  }

  controllaPresenza(numeri: number[], numero: number): Boolean{
    let controllo: boolean = true;
    numeri.forEach((n: number) => {
      if(n === numero){
        controllo = false;
      }
    });

    return controllo;
  }

  controllaDecina(numeri: number[], numero: number): Boolean{
    if(numero===90){
      numero-=1;
    }
    let limiteInf: number = Math.floor(numero/10)*10;
    let limiteSup: number = Math.ceil(numero/10)*10-1;
    let count: number = 0;
    numeri.forEach((n: number) => {
      if(n >= limiteInf && n <= limiteSup){
        count++;
      }
    })

    if(count>=3){
      return false;
    } else {
      return true;
    }

  }

  getNumeriOrdinati(numeri: number[]): any {
    let numeriOrdinati: number[] = [];
    for(let i=0; i<15; i++){
      let minore = 91;
      let indexMinore = 0;
      numeri.forEach((n : number, index: number)=>{
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

}
