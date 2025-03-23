import { TestBed } from '@angular/core/testing';
import { Service1Service } from './service1.service';
import { LogService } from './log.service';

describe('Service1Service', () => {
  let service: Service1Service;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LogService', ['write']);

    TestBed.configureTestingModule({
      providers: [
        Service1Service,
        { provide: LogService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(Service1Service);
    logServiceSpy = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct tabulated values', () => {
    const result = service.tabulateFunction(0, 2, 1);
    expect(result).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: Math.exp(-1) },
      { x: 2, y: Math.exp(-4) }
    ]);
  });

  it('should log messages when LogService is provided', () => {
    service.tabulateFunction(0, 1, 1);
    expect(logServiceSpy.write).toHaveBeenCalledTimes(2);
    expect(logServiceSpy.write).toHaveBeenCalledWith('Tabulated: x=0, y=1');
    expect(logServiceSpy.write).toHaveBeenCalledWith(`Tabulated: x=1, y=${Math.exp(-1)}`);
  });
});
