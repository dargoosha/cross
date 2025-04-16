import { TestBed } from '@angular/core/testing';
import { OperatingSystem } from '../classes/operating_system';
import { Antivirus } from '../classes/antivirus';
import { OfficeSuite } from '../classes/office_suite';
import { Driver } from '../classes/driver';
import { SoftwareFactoryService } from '../services/software-factory.service';

describe('SoftwareFactoryService', () => {
  let service: SoftwareFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create OperatingSystem instance', () => {
    const osData = {
      id: 1,
      name: 'Windows 10',
      price: 199,
      description: 'OS by Microsoft',
      version: '10.0',
      supportedArchitectures: ['x64', 'x86']
    };
    const product = service.createProduct('os', osData);
    expect(product).toBeInstanceOf(OperatingSystem);
    expect(product.getName()).toBe('Windows 10');
  });

  it('should create Antivirus instance', () => {
    const avData = {
      id: 2,
      name: 'Norton',
      price: 59,
      description: 'Antivirus by Norton',
      protectionLevel: 'High',
      supportedDevices: ['Windows', 'Mac']
    };
    const product = service.createProduct('antivirus', avData);
    expect(product).toBeInstanceOf(Antivirus);
    expect(product.getName()).toBe('Norton');
  });

  it('should create OfficeSuite instance', () => {
    const officeData = {
      id: 3,
      name: 'Office 365',
      price: 99,
      description: 'Office suite by Microsoft',
      includedApps: ['Word', 'Excel'],
      isSubscription: true
    };
    const product = service.createProduct('office', officeData);
    expect(product).toBeInstanceOf(OfficeSuite);
    expect(product.getName()).toBe('Office 365');
  });

  it('should create Driver instance', () => {
    const driverData = {
      id: 4,
      name: 'Nvidia Driver',
      price: 0,
      description: 'Driver for Nvidia GPUs',
      hardwareType: 'GPU',
      version: '456.78'
    };
    const product = service.createProduct('driver', driverData);
    expect(product).toBeInstanceOf(Driver);
    expect(product.getName()).toBe('Nvidia Driver');
  });

  it('should throw error for unknown product type', () => {
    expect(() => {
      service.createProduct('unknown', {});
    }).toThrowError('Unknown product type');
  });
});