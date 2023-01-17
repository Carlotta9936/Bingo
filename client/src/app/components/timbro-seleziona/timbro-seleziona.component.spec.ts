import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimbroSelezionaComponent } from './timbro-seleziona.component';

describe('TimbroSelezionaComponent', () => {
  let component: TimbroSelezionaComponent;
  let fixture: ComponentFixture<TimbroSelezionaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimbroSelezionaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimbroSelezionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
