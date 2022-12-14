import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user?: User;
  username: string | null = "NO";

  constructor(public Auth: AuthService, public database: DatabaseService) {
    let username = JSON.parse(localStorage.getItem('user')!);
    database.getUser(username).then((value) => {
      let u: User = {
        username: value.username,
        cognome: value.cognome,
        nome: value.nome,
        mail: value.mail,
        password: value.password,
        crediti: value.crediti,
        timbri: value.timbri,
        stats: {
          partiteFatte: this.isZero(value.stats.partiteFatte),
          bingo: this.isZero(value.stats.bingo),
          cinquine: this.isZero(value.stats.cinquine),
          superbingo: this.isZero(value.stats.superbingo),
          maxVincita: this.isZero(value.stats.maxVincita)
        }
      }
      this.user = u;
    })

  }
  
  ngOnInit() {
    console.log("USER", this.user?.username);
  }

  isZero(value: any): any{
    if(value === undefined){
      return 0;
    } else {
      return value;
    }
  }

}
