import { TestBed } from '@angular/core/testing';
import { SoftwareFactoryService } from './software-factory.service';
import { OperatingSystem } from '../classes/operating_system';
import { Antivirus } from '../classes/antivirus';
import { OfficeSuite } from '../classes/office_suite';

describe('SoftwareFactoryService', () => {
  let service: SoftwareFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an OperatingSystem product', () => {
    // Arrange
    const osData = {
      id: 'os-001',
      name: 'Windows 11',
      price: 199.99,
      description: 'Latest Windows operating system',
      version: '11.0',
      supportedArchitectures: ['x86', 'x64', 'ARM']
    };

    // Act
    const product = service.createProduct('os', osData);

    // Assert
    expect(product).toBeTruthy();
    expect(product instanceof OperatingSystem).toBeTruthy();
    expect(product.getId()).toBe(osData.id);
    expect(product.getName()).toBe(osData.name);
    expect(product.getPrice()).toBe(osData.price);
    expect(product.getDescription()).toBe(osData.description);
  });

  it('should create an Antivirus product', () => {
    // Arrange
    const antivirusData = {
      id: 'av-001',
      name: 'Norton Security',
      price: 49.99,
      description: 'Comprehensive antivirus protection',
      protectionLevel: 'Advanced',
      supportedDevices: ['Windows', 'Mac', 'Android', 'iOS']
    };

    // Act
    const product = service.createProduct('antivirus', antivirusData);

    // Assert
    expect(product).toBeTruthy();
    expect(product instanceof Antivirus).toBeTruthy();
    expect(product.getId()).toBe(antivirusData.id);
    expect(product.getName()).toBe(antivirusData.name);
    expect(product.getPrice()).toBe(antivirusData.price);
    expect(product.getDescription()).toBe(antivirusData.description);
  });

  it('should create an OfficeSuite product', () => {
    // Arrange
    const officeData = {
      id: 'off-001',
      name: 'Microsoft Office 365',
      price: 99.99,
      description: 'Complete productivity suite',
      includedApps: ['Word', 'Excel', 'PowerPoint', 'Outlook'],
      isSubscription: true
    };

    // Act
    const product = service.createProduct('office', officeData);

    // Assert
    expect(product).toBeTruthy();
    expect(product instanceof OfficeSuite).toBeTruthy();
    expect(product.getId()).toBe(officeData.id);
    expect(product.getName()).toBe(officeData.name);
    expect(product.getPrice()).toBe(officeData.price);
    expect(product.getDescription()).toBe(officeData.description);
  });


  it('should verify product info contains correct data', () => {
    // Arrange
    const osData = {
      id: 'os-002',
      name: 'MacOS',
      price: 0,
      description: 'Apple operating system',
      version: 'Ventura',
      supportedArchitectures: ['x64', 'ARM']
    };

    // Act
    const product = service.createProduct('os', osData);
    const info = product.getInfo();

    // Assert
    expect(info).toContain(`ID: ${osData.id}`);
    expect(info).toContain(`Name: ${osData.name}`);
    expect(info).toContain(`Price: $${osData.price}`);
    expect(info).toContain(`Description: ${osData.description}`);
  });
});