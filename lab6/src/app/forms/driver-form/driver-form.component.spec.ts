import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverFormComponent } from './driver-form.component';

describe('DriverFormComponent', () => {
  let component: DriverFormComponent;
  let fixture: ComponentFixture<DriverFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), DriverFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
