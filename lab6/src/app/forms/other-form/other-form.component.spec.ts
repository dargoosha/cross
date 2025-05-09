import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherFormComponent } from './other-form.component';

describe('OtherFormComponent', () => {
  let component: OtherFormComponent;
  let fixture: ComponentFixture<OtherFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), OtherFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
