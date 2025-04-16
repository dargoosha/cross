import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffsuiteFormComponent } from './offsuite-form.component';

describe('OffsuiteFormComponent', () => {
  let component: OffsuiteFormComponent;
  let fixture: ComponentFixture<OffsuiteFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), OffsuiteFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OffsuiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
