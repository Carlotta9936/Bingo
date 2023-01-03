import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardiaService implements CanActivate {

  constructor(private router:Router) { }

  canActivate(): boolean{
    let user = JSON.parse(localStorage.getItem('user')!);
    console.log("UU", user);
    if(user!=undefined){
      
      return true;
    } else {
      this.router.navigate(['first-page']);
      return false;
    }


  }
}
