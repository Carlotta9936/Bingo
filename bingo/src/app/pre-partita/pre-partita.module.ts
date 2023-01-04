import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrePartitaPageRoutingModule } from './pre-partita-routing.module';

import { PrePartitaPage } from './pre-partita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrePartitaPageRoutingModule
  ],
  declarations: [PrePartitaPage]
})
export class PrePartitaPageModule {}
