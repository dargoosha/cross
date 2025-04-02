import { TestBed } from '@angular/core/testing';
import { ProductServiceService } from './product-service.service';
import { SoftwareFactoryService } from './software-factory.service';
import { IProduct } from '../classes/Iproduct';
import { OperatingSystem } from '../classes/operating_system';
import { Antivirus } from '../classes/antivirus';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let factoryServiceSpy: jasmine.SpyObj<SoftwareFactoryService>;
  let fetchSpy: jasmine.Spy;
  
  const mockProducts = [
    {
      id: 'os-001',
      name: 'Windows 11',
      price: 199.99,
      description: 'Latest Windows operating system',
      type: 'os',
      version: '11.0',
      supportedArchitectures: ['x86', 'x64']
    },
    {
      id: 'av-001',
      name: 'Norton Security',
      price: 49.99,
      description: 'Comprehensive antivirus protection',
      type: 'antivirus',
      protectionLevel: 'Advanced',
      supportedDevices: ['Windows', 'Mac']
    }
  ];
  
  const mockOsProduct = jasmine.createSpyObj('OperatingSystem', 
    ['getId', 'getName', 'getPrice', 'getDescription', 'getInfo', 'getVersion', 'getSupportedArchitectures']);
  
  const mockAvProduct = jasmine.createSpyObj('Antivirus',
    ['getId', 'getName', 'getPrice', 'getDescription', 'getInfo', 'getProtectionLevel', 'getSupportedDevices']);

  beforeEach(() => {
    // Create spy for SoftwareFactoryService
    const spy = jasmine.createSpyObj('SoftwareFactoryService', ['createProduct']);
    
    // Mock the global fetch function
    fetchSpy = spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve({
          record: mockProducts
        })
      } as Response)
    );
    
    TestBed.configureTestingModule({
      providers: [
        ProductServiceService,
        { provide: SoftwareFactoryService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(ProductServiceService);
    factoryServiceSpy = TestBed.inject(SoftwareFactoryService) as jasmine.SpyObj<SoftwareFactoryService>;
    
    // Set up return values for the factory spy
    mockOsProduct.getId.and.returnValue('os-001');
    mockAvProduct.getId.and.returnValue('av-001');
    
    factoryServiceSpy.createProduct.and.callFake((type, data) => {
      if (type === 'os') return mockOsProduct;
      if (type === 'antivirus') return mockAvProduct;
      return null as unknown as IProduct;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should fetch products from JSONBin API', async () => {
    // Act
    await service.fetchProducts();
    
    // Assert
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.jsonbin.io/v3/b/67ec2a198a456b796680aae1/latest',
      {
        method: 'GET',
        headers: {
          'X-Master-Key': '$2a$10$FONQ3CRy4LKnYn3eqLJOvOxtDwoStWgJcN0joZJsFwlPS8LW/oLvG'
        }
      }
    );
    
    expect(factoryServiceSpy.createProduct).toHaveBeenCalledTimes(2);
    expect(factoryServiceSpy.createProduct).toHaveBeenCalledWith('os', mockProducts[0]);
    expect(factoryServiceSpy.createProduct).toHaveBeenCalledWith('antivirus', mockProducts[1]);
    
    const products = service.getProducts();
    expect(products.length).toBe(2);
    expect(products[0]).toBe(mockOsProduct);
    expect(products[1]).toBe(mockAvProduct);
  });
  
  it('should handle API errors when fetching products', async () => {
    // Arrange
    fetchSpy.and.returnValue(Promise.reject(new Error('Network error')));
    
    // Act & Assert
    await expectAsync(service.fetchProducts()).toBeRejectedWithError('Network error');
    expect(service.getProducts().length).toBe(0);
  });
  
  it('should handle alternative API response format', async () => {
    // Arrange
    fetchSpy.and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(mockProducts) // Direct array without 'record' property
      } as Response)
    );
    
    // Act
    await service.fetchProducts();
    
    // Assert
    expect(factoryServiceSpy.createProduct).toHaveBeenCalledTimes(2);
    expect(service.getProducts().length).toBe(2);
  });
  
  it('should add a new product', () => {
    // Arrange
    const newProductData = {
      id: 'off-001',
      name: 'Microsoft Office',
      price: 149.99,
      description: 'Office suite',
      includedApps: ['Word', 'Excel'],
      isSubscription: true
    };
    
    const mockOfficeProduct = jasmine.createSpyObj('OfficeSuite', 
      ['getId', 'getName', 'getPrice', 'getDescription', 'getInfo']);
    mockOfficeProduct.getId.and.returnValue('off-001');
    
    factoryServiceSpy.createProduct.and.returnValue(mockOfficeProduct);
    
    // Act
    service.addProduct('office', newProductData);
    
    // Assert
    expect(factoryServiceSpy.createProduct).toHaveBeenCalledWith('office', newProductData);
    expect(service.getProducts().length).toBe(1);
    expect(service.getProducts()[0]).toBe(mockOfficeProduct);
  });
  
  it('should get product by ID', async () => {
    // Arrange
    await service.fetchProducts(); // Populate with mock products
    
    // Act
    const product = service.getProductById('os-001');
    const nonExistentProduct = service.getProductById('non-existent');
    
    // Assert
    expect(product).toBe(mockOsProduct);
    expect(nonExistentProduct).toBeUndefined();
  });
  
  it('should get all products', async () => {
    // Arrange
    await service.fetchProducts(); // Populate with mock products
    
    // Act
    const products = service.getProducts();
    
    // Assert
    expect(products.length).toBe(2);
    expect(products).toContain(mockOsProduct);
    expect(products).toContain(mockAvProduct);
  });
});