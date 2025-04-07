import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { DistanceService } from '../service/distance.service';
import { CoordinateInputComponent } from '../component/coordinate-input/coordinate-input.component';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

class DistanceServiceMock {
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    return 451.23; 
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let distanceService: DistanceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent, 
        CoordinateInputComponent, 
        HomePage,
      ],
      providers: [
        { provide: DistanceService, useClass: DistanceServiceMock }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    distanceService = TestBed.inject(DistanceService); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize distance and formattedDistance as null', () => {
    expect(component.distance).toBeNull();
    expect(component.formattedDistance).toBeNull();
  });

  it('should calculate distance and format it when onCoordinatesSubmitted is called', () => {

    const coords = {
      lat1: 50.4501,
      lon1: 30.5234,
      lat2: 48.9226,
      lon2: 24.7111,
    };

    component.onCoordinatesSubmitted(coords);

    expect(component.distance).toBe(451.23);

    expect(component.formattedDistance).toBe('451.23');
  });

  it('should call calculateDistance with correct parameters', () => {
    spyOn(distanceService, 'calculateDistance').and.returnValue(451.23);

    const coords = {
      lat1: 50.4501,
      lon1: 30.5234,
      lat2: 48.9226,
      lon2: 24.7111,
    };

    component.onCoordinatesSubmitted(coords);

    expect(distanceService.calculateDistance).toHaveBeenCalledWith(
      50.4501,
      30.5234,
      48.9226,
      24.7111
    );

    expect(component.distance).toBe(451.23);
  });

  it('should handle zero distance correctly', () => {
    spyOn(distanceService, 'calculateDistance').and.returnValue(0);

    const coords = {
      lat1: 50.4501,
      lon1: 30.5234,
      lat2: 50.4501,
      lon2: 30.5234,
    };

    component.onCoordinatesSubmitted(coords);

    expect(component.distance).toBe(0);

    expect(component.formattedDistance).toBe(null);
  });
});