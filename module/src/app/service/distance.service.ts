import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  private readonly R = 6371; 
  
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const phi1 = this.toRadians(lat1);
    const phi2 = this.toRadians(lat2);
    const lambda1 = this.toRadians(lon1);
    const lambda2 = this.toRadians(lon2);

    const sinDeltaPhi = Math.sin((phi2 - phi1) / 2);
    const sinDeltaLambda = Math.sin((lambda2 - lambda1) / 2);

    const a =
      sinDeltaPhi * sinDeltaPhi +
      Math.cos(phi1) * Math.cos(phi2) * sinDeltaLambda * sinDeltaLambda;

    const c = 2 * Math.asin(Math.sqrt(a));
    return this.R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}