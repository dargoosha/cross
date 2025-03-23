import { TestBed } from '@angular/core/testing';
import { Service3Service } from './service3.service';
import { LogService } from './log.service';

describe('Service3Service', () => {
  let service: Service3Service;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LogService', ['write']);

    TestBed.configureTestingModule({
      providers: [
        Service3Service,
        { provide: LogService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(Service3Service);
    logServiceSpy = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly compute the exponential series recursively for x=0', () => {
    expect(service.computeExpRecursive(0)).toBe(1);
  });

  it('should correctly compute the exponential series recursively for x=0.5 with 4 terms', () => {
    const result = service.computeExpRecursive(0.5, 4);
    expect(result).toBeCloseTo(0.7786, 4);
  });

  it('should correctly compute the exponential series recursively for x=-0.5 with 4 terms', () => {
    const result = service.computeExpRecursive(-0.5, 4);
    expect(result).toBeCloseTo(0.7786, 4);
  });

  it('should log messages when LogService is provided', () => {
    service.computeExpRecursive(0.5, 3);
    expect(logServiceSpy.write).toHaveBeenCalledTimes(3);
    expect(logServiceSpy.write).toHaveBeenCalledWith(jasmine.stringMatching(/Recursion: x=0.5, term=0, sum=.*/));
  });
});
