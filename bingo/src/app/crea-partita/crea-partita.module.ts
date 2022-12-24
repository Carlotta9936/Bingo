import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaPartitaPageRoutingModule } from './crea-partita-routing.module';

import { CreaPartitaPage } from './crea-partita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaPartitaPageRoutingModule
  ],
  declarations: [CreaPartitaPage]
})
export class CreaPartitaPageModule {}
