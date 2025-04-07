import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent  } from '@ionic/angular/standalone';
import { DistanceService } from '../service/distance.service';
import { CoordinateInputComponent } from '../component/coordinate-input/coordinate-input.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, CoordinateInputComponent, CommonModule],
})

export class HomePage {
  distance: number | null = null;
  formattedDistance: string | null = null;
  constructor(private distanceService: DistanceService) {}

  onCoordinatesSubmitted(coords: { lat1: number; lon1: number; lat2: number; lon2: number }) {
    this.distance = this.distanceService.calculateDistance(
      coords.lat1,
      coords.lon1,
      coords.lat2,
      coords.lon2
    );
    this.formattedDistance = this.distance ? this.distance.toFixed(2) : null;
  }
}