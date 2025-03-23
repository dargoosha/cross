import { TestBed } from '@angular/core/testing';
import { Service2Service } from './service2.service';
import { LogService } from './log.service';

describe('Service2Service', () => {
  let service: Service2Service;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LogService', ['write']);

    TestBed.configureTestingModule({
      providers: [
        Service2Service,
        { provide: LogService, useValue: spy }
      ]
    });

    service = TestBed.inject(Service2Service);
    logServiceSpy = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly compute exponential series for x=0', () => {
    expect(service.computeExpSeries(0)).toBeCloseTo(1, 10); // e^0 = 1
  });

  it('should correctly compute exponential series for x=1', () => {
    // e^(-1^2) = e^(-1)
    const expected = Math.exp(-1); 
    expect(service.computeExpSeries(1)).toBeCloseTo(expected, 5);
  });

  it('should correctly compute exponential series for x=-1', () => {
    // e^(-(-1)^2) = e^(-1)
    const expected = Math.exp(-1); 
    expect(service.computeExpSeries(-1)).toBeCloseTo(expected, 5);
  });

  it('should log messages when LogService is provided', () => {
    service.computeExpSeries(0.5, 5);
    expect(logServiceSpy.write).toHaveBeenCalledTimes(1);
    expect(logServiceSpy.write).toHaveBeenCalledWith(jasmine.stringMatching(/Series: x=0.5, terms=5, sum=.*/));
  });

  it('should correctly compute factorial', () => {
    // @ts-ignore
    expect(service.factorial(0)).toBe(1);
    // @ts-ignore
    expect(service.factorial(1)).toBe(1);
    // @ts-ignore
    expect(service.factorial(5)).toBe(120);
  });
});
