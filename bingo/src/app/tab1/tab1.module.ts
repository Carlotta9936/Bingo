import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SchedaComponent } from "../components/scheda/scheda.component";
import { SchedeComponent } from '../components/schede/schede.component';
import { TabelloneComponent } from '../components/tabellone/tabellone.component';
import { CellaComponent } from '../components/cella/cella.component';
import { CasellaComponent } from '../components/casella/casella.component';
import { CreditiComponent } from '../components/crediti/crediti.component';

@NgModule({
    declarations: [Tab1Page, CreditiComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        
    ]
})
export class Tab1PageModule {}
