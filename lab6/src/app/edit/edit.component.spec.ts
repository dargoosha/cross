import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { IonicModule } from '@ionic/angular';
import { SoftwareFactoryService } from '../services/software-factory.service';
import { FormsFactoryService } from '../services/forms-factory.service';
import { Antivirus } from '../classes/antivirus';
import { Driver } from '../classes/driver';
import { OfficeSuite } from '../classes/office_suite';
import { OperatingSystem } from '../classes/operating_system';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let softwareFactorySpy: jasmine.SpyObj<SoftwareFactoryService>;
  let formsFactorySpy: jasmine.SpyObj<FormsFactoryService>;

  const mockProducts = [
    new OperatingSystem('1', 'Windows 10', 199, 'OS by Microsoft', '10.0', ['x64', 'x86']),
    new Antivirus('2', 'Norton', 59, 'Antivirus by Norton', 'High', 22344),
    new OfficeSuite('3', 'Office 365', 99, 'Office suite by Microsoft', ['Word', 'Excel'], true),
    new Driver('4', 'Nvidia Driver', 0, 'Driver for Nvidia GPUs', 'GPU', '456.78')
  ];

  beforeEach(waitForAsync(() => {
    const softwareFactorySpyObj = jasmine.createSpyObj('SoftwareFactoryService', ['createProduct']);
    const formsFactorySpyObj = jasmine.createSpyObj('FormsFactoryService', ['createForm']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditComponent
      ],
      providers: [
        { provide: SoftwareFactoryService, useValue: softwareFactorySpyObj },
        { provide: FormsFactoryService, useValue: formsFactorySpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    softwareFactorySpy = TestBed.inject(SoftwareFactoryService) as jasmine.SpyObj<SoftwareFactoryService>;
    formsFactorySpy = TestBed.inject(FormsFactoryService) as jasmine.SpyObj<FormsFactoryService>;
    
    component.products = [...mockProducts];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null selected product index', () => {
    expect(component.selectedProductIndex).toBeNull();
  });

  describe('onSelectProduct', () => {
    it('should set selected product index and type', () => {
      const event = { detail: { value: 1 } };
      component.onSelectProduct(event);
      
      expect(component.selectedProductIndex).toBe(1);
      expect(component.selectedProductType).toBe('antivirus');
    });

    it('should handle null selection', () => {
      const event = { detail: { value: null } };
      component.onSelectProduct(event);
      
      expect(component.selectedProductIndex).toBeNull();
    });
  });

  describe('getProductType', () => {
    it('should identify OperatingSystem', () => {
      const type = component.getProductType(mockProducts[0]);
      expect(type).toBe('os');
    });

    it('should identify Antivirus', () => {
      const type = component.getProductType(mockProducts[1]);
      expect(type).toBe('antivirus');
    });

    it('should identify OfficeSuite', () => {
      const type = component.getProductType(mockProducts[2]);
      expect(type).toBe('office');
    });

    it('should identify Driver', () => {
      const type = component.getProductType(mockProducts[3]);
      expect(type).toBe('driver');
    });

    it('should default to antivirus for unknown type', () => {
      const unknownProduct = { id: 99, name: 'Unknown' } as any;
      const type = component.getProductType(unknownProduct);
      expect(type).toBe('antivirus');
    });
  });

  describe('onFormSubmit', () => {

    it('should not update product when no index is selected', () => {
      component.selectedProductIndex = null;
      
      const formData = { name: 'Test' };
      component.onFormSubmit(formData);
      
      expect(softwareFactorySpy.createProduct).not.toHaveBeenCalled();
    });
  });

  describe('onDeleteProduct', () => {
    it('should delete product when valid index is selected', () => {
      component.selectedProductIndex = 1;
      const initialLength = component.products.length;
      
      component.onDeleteProduct();
      
      expect(component.products.length).toBe(initialLength - 1);
      expect(component.selectedProductIndex).toBeNull();
    });

    it('should not delete product when no index is selected', () => {
      component.selectedProductIndex = null;
      const initialLength = component.products.length;
      
      component.onDeleteProduct();
      
      expect(component.products.length).toBe(initialLength);
    });
  });

  describe('UI interactions', () => {
    it('should render product select dropdown', () => {
      const select = fixture.nativeElement.querySelector('ion-select');
      expect(select).toBeTruthy();
      
      const options = fixture.nativeElement.querySelectorAll('ion-select-option');
      expect(options.length).toBe(mockProducts.length);
    });
  });
});