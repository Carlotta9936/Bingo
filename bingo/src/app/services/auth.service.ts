import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { tap } from 'rxjs/operators';

const $ApiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  public set(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string){
    localStorage.getItem(key);
  }

  public deleteUser(key: string): any{
    localStorage.removeItem(key);
  }

}
