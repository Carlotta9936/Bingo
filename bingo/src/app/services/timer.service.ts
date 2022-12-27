import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  interval?: any;

  constructor() { }

  startTimer(time: number):any {
    let timeLeft = time;
    /*
    this.interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
        console.log("tempo"+ timeLeft);
      } else {
        timeLeft = time;
        console.log("Time" + time)
        fun;
      }
    },1000)*/

    this.interval = setTimeout(() => {
      console.log("!");
    }, time*1000);
  }

}