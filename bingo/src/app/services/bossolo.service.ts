import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BossoloService {

  bossolo: number[]=[];
  tabellone: boolean[]=[];


  constructor() {
    //creo un array con tutti i numeri estraibili 
    //e inizializzo il tabellone a true
      for(let i=1;i<91;i++){
        this.bossolo.push(i);
        this.tabellone.push(false);
        console.log("i"+i);
      }
      console.log(this.tabellone);
   }


  estraiNumero(): number{
    let index=Math.floor(Math.random() * (this.bossolo.length));
    let numero= this.bossolo[index];
    this.segnaNumero(numero);
    console.log("estratto "+ index+ " numero"+ numero);
    console.log("bossolo"+this.bossolo);
    this.bossolo.splice(index,1);
    return numero;
  }

  segnaNumero(numero: any): void{
    this.tabellone[numero]=true;
  }
}
