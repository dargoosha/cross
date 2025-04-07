import { TestBed } from '@angular/core/testing';
import { DistanceService } from './distance.service';

describe('DistanceService', () => {
  let service: DistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert degrees to radians correctly', () => {
    expect(service['toRadians'](0)).toBe(0); 
    expect(service['toRadians'](180)).toBe(Math.PI); 
    expect(service['toRadians'](90)).toBe(Math.PI / 2); 
    expect(service['toRadians'](-90)).toBe(-Math.PI / 2);
  });

  it('should calculate distance between two different points correctly', () => {
    const lat1 = 50.4501; 
    const lon1 = 30.5234;
    const lat2 = 48.9226; 
    const lon2 = 24.7111;

    const distance = service.calculateDistance(lat1, lon1, lat2, lon2);

    expect(distance).toBeCloseTo(451, 0); 
  });

  it('should return 0 for identical points', () => {
    const lat1 = 50.4501;
    const lon1 = 30.5234;
    const lat2 = 50.4501; 
    const lon2 = 30.5234;

    const distance = service.calculateDistance(lat1, lon1, lat2, lon2);

    expect(distance).toBe(0);
  });

  it('should calculate distance between two points on the equator', () => {
    const lat1 = 0; 
    const lon1 = 0;
    const lat2 = 0; 
    const lon2 = 1;

    const distance = service.calculateDistance(lat1, lon1, lat2, lon2);

    const expectedDistance = 6371 * (1 * Math.PI / 180);
    expect(distance).toBeCloseTo(expectedDistance, 0);
  });

  it('should calculate distance between North and South poles', () => {
    const lat1 = 90;
    const lon1 = 0;
    const lat2 = -90;
    const lon2 = 0;

    const distance = service.calculateDistance(lat1, lon1, lat2, lon2);

    const expectedDistance = Math.PI * 6371;
    expect(distance).toBeCloseTo(expectedDistance, 0); 
  });

  it('should calculate distance between antipodal points on the equator', () => {
    const lat1 = 0; 
    const lon1 = 0;
    const lat2 = 0; 
    const lon2 = 180; 

    const distance = service.calculateDistance(lat1, lon1, lat2, lon2);

    const expectedDistance = Math.PI * 6371;
    expect(distance).toBeCloseTo(expectedDistance, 0); 
  });
});