import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { SoftwareFactoryService } from '../services/software-factory.service';
import { IProduct } from '../classes/Iproduct';
import { Antivirus } from '../classes/antivirus';
import { Driver } from '../classes/driver';
import { OfficeSuite } from '../classes/office_suite';
import { OperatingSystem } from '../classes/operating_system';
describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let softwareFactoryService: SoftwareFactoryService;

  const mockProducts: IProduct[] = [
    new OperatingSystem('1', 'Windows 10', 199, 'OS by Microsoft', '10.0', ['x64', 'x86']),
    new Antivirus('2', 'Norton', 59, 'Antivirus by Norton', 'High', 123),
    new OfficeSuite('3', 'Office 365', 99, 'Office suite by Microsoft', ['Word', 'Excel'], true),
    new Driver('4', 'Nvidia Driver', 0, 'Driver for Nvidia GPUs', 'GPU', '456.78')
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComponent],
      providers: [SoftwareFactoryService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    softwareFactoryService = TestBed.inject(SoftwareFactoryService);
    component.products = [...mockProducts];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default product type as "antivirus"', () => {
    expect(component.selectedProductType).toBe('antivirus');
  });

  it('should update selectedProductType on segment change', () => {
    const newType = 'os';
    component.onSegmentChange({ detail: { value: newType } });
    expect(component.selectedProductType).toBe(newType);
  });

  it('should call softwareFactory and add new product on form submit', () => {
    const spy = spyOn(softwareFactoryService, 'createProduct').and.callThrough();
    const formData = { name: 'Test Antivirus', price: 49, description: 'Test desc', protectionLevel: 'Medium', licenseKey: 999 };
    
    component.onFormSubmit(formData);
    
    expect(spy).toHaveBeenCalledWith('antivirus', formData);
    expect(component.products.length).toBe(mockProducts.length + 1);
  });

  it('should not add product when form data is empty', () => {
    const initialLength = component.products.length;
    component.onFormSubmit(null);
    expect(component.products.length).toBe(initialLength);
  });

});