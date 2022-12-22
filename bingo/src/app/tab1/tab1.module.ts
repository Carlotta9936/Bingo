import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SchedaComponent } from "../components/scheda/scheda.component";
import { SchedeComponent } from '../components/schede/schede.component';
import { CasellaComponent } from '../components/casella/casella.component';

@NgModule({
    declarations: [Tab1Page, SchedaComponent, SchedeComponent, CasellaComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        
    ]
})
export class Tab1PageModule {}
