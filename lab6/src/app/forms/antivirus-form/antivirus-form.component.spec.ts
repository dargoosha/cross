import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AntivirusFormComponent } from './antivirus-form.component';

describe('AntivirusFormComponent', () => {
  let component: AntivirusFormComponent;
  let fixture: ComponentFixture<AntivirusFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), AntivirusFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AntivirusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
