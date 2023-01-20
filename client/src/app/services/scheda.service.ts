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
      if(this.controllaPresenza(numeri, n) && this.controllaDecina(numeri, n)<3){
        numeri.push(n);
      } else {
        i--;
      }
    }

    return this.sistemaBianche(this.aggiungiVuote(this.getNumeriOrdinati(numeri)));

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

  controllaDecina(numeri: number[], numero: number): number{
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

    console.log(numero, "Count", count);

    return count;

    /*
    if(count>=3){
      return false;
    } else {
      return true;
    }
    */

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
    console.log("N", numeriOrdinati);
    return numeriOrdinati;
  }

  aggiungiVuote(numeri: number[]): any {
    let rigaDecine = 0;
    let bianche = 3;
    let nuovoArray: number[] = [];
    numeri.forEach(numero => {
      if(numero !== 90){
        //Controllo la decina 
        if(rigaDecine === Math.floor(numero/10)){
          bianche--;
        } else {
          let differenza = Math.floor(numero/10) - rigaDecine - 1;
          console.log(" DIFF ", Math.floor(numero/10) - rigaDecine - 1);
          console.log(rigaDecine, " Aggiungi zeri: ", bianche + (3*differenza));
          for(let i = bianche + (3*differenza); i > 0; i--){
            nuovoArray.push(0);
          }

          bianche = 2;
          rigaDecine++;
      }
    }
    nuovoArray.push(numero);
 
    })

    if(bianche!==0){
      for(let i = bianche; i > 0; i--){
        nuovoArray.push(0);
      }
    }
    return nuovoArray;
  }

  sistemaBianche(numeri: number[]): number[] {
    let matrice: number[][] = this.sistemaInMatrice(numeri);
    let contaBianche = 0;
    let nuovoArray: number[] = [];
    
    //Scambio le caselle della terza e la seconda fila

    let righe = this.scambiaCaselle(matrice[2], matrice[1]);

    matrice[2] = righe[0];
    matrice[1] = righe[1];

    if(righe[2] === true){
      let righe = this.scambiaCaselle(matrice[2], matrice[0]);

      matrice[2] = righe[0];
      matrice[0] = righe[1];
    }


    //Scambio le caselle della seconda e della prima

    righe = this.scambiaCaselle(matrice[1], matrice[0]);

    matrice[1] = righe[0];
    matrice[0] = righe[1];

    for(let j = 0; j < 11; j++){
      for(let i = 0; i < 3; i++){
        nuovoArray.push(matrice[i][j]);
      }
    }

    return nuovoArray;
  }

  sistemaInMatrice(numeri: number[]): number[][]{
    //console.log("numeri ", numeri);
    let matrice: number[][] = [];
    matrice[0] = [];
    matrice[1] = [];
    matrice [2] = [];
    let index: number = 0;

    for(let j = 0; j < 9; j++){
      for(let i = 0; i < 3; i++){
        matrice[i][j] = numeri[index];
        index++;
      }
    }

    //console.log("M", matrice);
    return matrice;
  }

  scambiaCaselle(rigaSopra: number[], rigaSotto: number[]): any{
    let contaBianche = 0;
    let colonne: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let continua = true;
    let mancaCasella =  false;

    console.log("RIGA SOPRA", rigaSopra);
    console.log("RIGA SOTTO", rigaSotto);

    for(let i = 0; i < rigaSopra.length; i++){
      if(rigaSopra[i] === 0){
        contaBianche++;
      }
    }
    
    console.log("Bianche " + contaBianche);

    while(continua===true){
      let index = Math.floor(Math.random()*8)
      let colonna = colonne[index];
      //console.log("Random " + colonna);
      let appoggio = 0;
      //console.log("IF: ", rigaSotto[colonna]!==0, rigaSopra[colonna]===0);
      if(rigaSotto[colonna]!==0 && rigaSopra[colonna]===0){
        console.log("scambio", rigaSotto[colonna], rigaSopra[colonna])
        appoggio = rigaSotto[colonna];
        rigaSotto[colonna] = rigaSopra[colonna];
        rigaSopra[colonna] = appoggio;
        contaBianche--;
        //console.log("CB",contaBianche)
      }

      colonne.splice(index, 1);
      //console.log("contaBianche === 4", contaBianche);

      if(contaBianche===4 || colonne.length===0){
        continua=false;
        if(contaBianche===4){
          mancaCasella = true;
        }
      }
    };

    /*
    for(let i=0; i<rigaSopra.length; i++){
      console.log("I: " + i);

    }*/
    return [rigaSopra, rigaSotto, mancaCasella];
  }
}
