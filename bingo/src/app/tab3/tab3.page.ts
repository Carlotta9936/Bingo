import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: User;
  username: string | null = "NO";

  constructor(public Auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user')!);
    
  }

  ngOnInit() {
    console.log("USER", this.user?.username);
  }


}
