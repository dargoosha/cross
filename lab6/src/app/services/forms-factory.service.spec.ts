import { TestBed } from '@angular/core/testing';
import { FormsFactoryService } from './forms-factory.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('FormsFactoryService', () => {
  let service: FormsFactoryService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormsFactoryService]
    });
    service = TestBed.inject(FormsFactoryService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uniqueIdValidator', () => {
    it('should return null when no products provided', () => {
      const validator = (service as any).uniqueIdValidator();
      const result = validator(fb.control('test-id'));
      expect(result).toBeNull();
    });

    it('should return validation error when ID is duplicate', () => {
      const products = [{ id: 'duplicate-id' }];
      const validator = (service as any).uniqueIdValidator(products);
      const result = validator(fb.control('duplicate-id'));
      expect(result).toEqual({ uniqueId: { value: 'duplicate-id' } });
    });

    it('should return null when ID is unique', () => {
      const products = [{ id: 'existing-id' }];
      const validator = (service as any).uniqueIdValidator(products);
      const result = validator(fb.control('unique-id'));
      expect(result).toBeNull();
    });
  });

  describe('priceRangeValidator', () => {
    it('should return null for valid price range (1-10000)', () => {
      const validator = (service as any).priceRangeValidator();
      expect(validator(fb.control(1))).toBeNull();
      expect(validator(fb.control(5000))).toBeNull();
      expect(validator(fb.control(10000))).toBeNull();
    });

    it('should return null when no value provided', () => {
      const validator = (service as any).priceRangeValidator();
      expect(validator(fb.control(''))).toBeNull();
      expect(validator(fb.control(null))).toBeNull();
    });
  });

  describe('createProductForm', () => {
    const testProducts = [{ id: 'existing-id' }];


    describe('Antivirus product type', () => {
      it('should create form with antivirus specific fields', () => {
        const form = service.createProductForm('antivirus');
        
        expect(form.contains('protectionLevel')).toBeTruthy();
        expect(form.contains('supportedDevices')).toBeTruthy();
        
        const protectionControl = form.get('protectionLevel');
        protectionControl?.setValue('Invalid');
        expect(protectionControl?.hasError('pattern')).toBeTruthy();
        protectionControl?.setValue('Premium');
        expect(protectionControl?.valid).toBeTruthy();
      });
    });

    describe('Driver product type', () => {
      it('should create form with driver specific fields', () => {
        const form = service.createProductForm('driver');
        
        expect(form.contains('hardwareType')).toBeTruthy();
        expect(form.contains('version')).toBeTruthy();
        
        const hardwareControl = form.get('hardwareType');
        hardwareControl?.setValue('Invalid');
        expect(hardwareControl?.hasError('pattern')).toBeTruthy();
        hardwareControl?.setValue('GPU');
        expect(hardwareControl?.valid).toBeTruthy();
      });
    });
  });
});