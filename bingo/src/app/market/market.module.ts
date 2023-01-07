import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketPageRoutingModule } from './market-routing.module';

import { MarketPage } from './market.page';
import { AcquistoTimbroComponent } from '../components/acquisto-timbro/acquisto-timbro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketPageRoutingModule
  ],
  declarations: [MarketPage, AcquistoTimbroComponent]
})
export class MarketPageModule {}
