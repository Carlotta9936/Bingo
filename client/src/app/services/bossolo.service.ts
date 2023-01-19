import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class BossoloService {

  estratto?: string;
  bossolo: number[]=[];
  tabellone: boolean[]=[];

  timeLeft: number = 1;
  interval?: any;

  constructor(public socket: SocketService, 
              public auth: AuthService //per test
    ){
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
    return Math.floor(Math.random() * (this.bossolo.length));
    
   /* 
    let numero= this.bossolo[index];
    this.segnaNumero(numero);
    console.log("estratto "+ index+ " numero"+ numero);
    console.log("bossolo"+this.bossolo);
    this.bossolo.splice(index,1);
    return numero;*/
  }


  estrazione(): void{
    this.socket.estraiNumero(this.estraiNumero(), this.auth.get('user'));
    window.location.reload;
  }

  startTimer():void {
    this.interval = setInterval(() => {
      if(this.bossolo.length!=0){
        if(this.timeLeft > 0) {
          this.timeLeft--;
          //console.log("tempo"+this.timeLeft);
        } else {
          this.timeLeft = 1;
          this.estrazione();
        }
      }else{
        this.stopTimer;
      }
    },1000)
  }

  stopTimer(): void{
    clearInterval(this.interval);
  }

  
  segnaNumero(numero: any): void{
    this.tabellone[numero]=true;
  }


  ascoltaNumero(index: number): any{
    let numero= this.bossolo[index];
    this.segnaNumero(numero);
    this.bossolo.splice(index,1);
  }

  ritornaNumero(): Observable<number>{
    const numeroEstratto=new Observable<number>((observer)=>{
      let numero=Number(this.estratto);
      observer.next(numero);
    })
    return numeroEstratto;
  }
}
