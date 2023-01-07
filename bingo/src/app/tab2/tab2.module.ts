import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { RegistrazionePageModule } from '../registrazione/registrazione.module';
import { TabelloneComponent } from '../components/tabellone/tabellone.component';
import { CellaComponent } from '../components/cella/cella.component';

@NgModule({
    declarations: [Tab2Page, TabelloneComponent, CellaComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab2PageRoutingModule,
        RegistrazionePageModule,
    ]
})
export class Tab2PageModule {}
