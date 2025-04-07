import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';
import { CoordinateInputComponent } from './coordinate-input.component';

describe('CoordinateInputComponent', () => {
  let component: CoordinateInputComponent;
  let fixture: ComponentFixture<CoordinateInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        IonContent, IonLabel, IonButton, IonInput, IonItem,
        CoordinateInputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoordinateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with four controls', () => {
    expect(component.coordinateForm).toBeTruthy();
    expect(component.coordinateForm.contains('lat1')).toBeTrue();
    expect(component.coordinateForm.contains('lon1')).toBeTrue();
    expect(component.coordinateForm.contains('lat2')).toBeTrue();
    expect(component.coordinateForm.contains('lon2')).toBeTrue();
  });

  it('should mark form as invalid if required fields are empty', () => {
    const form = component.coordinateForm;
    expect(form.valid).toBeFalse(); 

    expect(form.get('lat1')?.hasError('required')).toBeTrue();
    expect(form.get('lon1')?.hasError('required')).toBeTrue();
    expect(form.get('lat2')?.hasError('required')).toBeTrue();
    expect(form.get('lon2')?.hasError('required')).toBeTrue();
  });

  it('should mark lat1 and lat2 as invalid if values are out of range', () => {
    const lat1Control = component.coordinateForm.get('lat1');
    const lat2Control = component.coordinateForm.get('lat2');

    lat1Control?.setValue(91); 
    expect(lat1Control?.hasError('max')).toBeTrue();

    lat1Control?.setValue(-91); 
    expect(lat1Control?.hasError('min')).toBeTrue();

    lat2Control?.setValue(100); 
    expect(lat2Control?.hasError('max')).toBeTrue();

    lat2Control?.setValue(-100); 
    expect(lat2Control?.hasError('min')).toBeTrue();

    lat1Control?.setValue(50);
    lat2Control?.setValue(48);
    expect(lat1Control?.valid).toBeTrue();
    expect(lat2Control?.valid).toBeTrue();
  });

  it('should mark lon1 and lon2 as invalid if values are out of range', () => {
    const lon1Control = component.coordinateForm.get('lon1');
    const lon2Control = component.coordinateForm.get('lon2');

    lon1Control?.setValue(181);
    expect(lon1Control?.hasError('max')).toBeTrue();

    lon1Control?.setValue(-181);
    expect(lon1Control?.hasError('min')).toBeTrue();

    lon2Control?.setValue(190); 
    expect(lon2Control?.hasError('max')).toBeTrue();

    lon2Control?.setValue(-190); 
    expect(lon2Control?.hasError('min')).toBeTrue();

    lon1Control?.setValue(30);
    lon2Control?.setValue(24);
    expect(lon1Control?.valid).toBeTrue();
    expect(lon2Control?.valid).toBeTrue();
  });

  it('should emit coordinatesSubmitted event with correct values when form is valid', () => {
    spyOn(component.coordinatesSubmitted, 'emit');

    component.coordinateForm.setValue({
      lat1: '50.4501',
      lon1: '30.5234',
      lat2: '48.9226',
      lon2: '24.7111',
    });

    component.onSubmit();

    expect(component.coordinatesSubmitted.emit).toHaveBeenCalledWith({
      lat1: 50.4501,
      lon1: 30.5234,
      lat2: 48.9226,
      lon2: 24.7111,
    });
  });

  it('should not emit coordinatesSubmitted event when form is invalid', () => {
    
    spyOn(component.coordinatesSubmitted, 'emit');

    component.onSubmit();

    expect(component.coordinatesSubmitted.emit).not.toHaveBeenCalled();
  });

  it('should mark form as invalid if some fields are empty', () => {
    const form = component.coordinateForm;

    form.setValue({
      lat1: '50.4501',
      lon1: '30.5234',
      lat2: '', 
      lon2: '24.7111',
    });

    expect(form.valid).toBeFalse();
    expect(form.get('lat2')?.hasError('required')).toBeTrue();
  });
});