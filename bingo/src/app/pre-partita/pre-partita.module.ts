import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrePartitaPageRoutingModule } from './pre-partita-routing.module';
import { SchedeComponent } from '../components/schede/schede.component';
import { SchedaComponent } from '../components/scheda/scheda.component';
import { CasellaComponent } from '../components/casella/casella.component';
import { PrePartitaPage } from './pre-partita.page';
import { TabelloneComponent } from '../components/tabellone/tabellone.component';
import { CellaComponent } from '../components/cella/cella.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrePartitaPageRoutingModule,
  ],
  declarations: [PrePartitaPage, SchedeComponent, SchedaComponent, CasellaComponent, TabelloneComponent, CellaComponent]
})
export class PrePartitaPageModule {}
