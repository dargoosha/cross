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

  describe('getCommonFields', () => {
    it('should return a FormGroup with common fields and validators', () => {
      const form = (service as any).getCommonFields();
      
      expect(form.contains('id')).toBeTruthy();
      expect(form.contains('name')).toBeTruthy();
      expect(form.contains('price')).toBeTruthy();
      expect(form.contains('description')).toBeTruthy();

      const idControl = form.get('id');
      expect(idControl?.hasError('required')).toBeTruthy();
      idControl?.setValue('test');
      expect(idControl?.hasError('required')).toBeFalsy();
    });

    it('should validate unique ID when products are provided', () => {
      const products = [{ id: 'existing-id' }];
      const form = (service as any).getCommonFields(products);
      const idControl = form.get('id');
      
      idControl?.setValue('existing-id');
      expect(idControl?.hasError('uniqueId')).toBeTruthy();
      
      idControl?.setValue('new-id');
      expect(idControl?.hasError('uniqueId')).toBeFalsy();
    });
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

    it('should throw error for unknown product type', () => {
      expect(() => service.createProductForm('unknown' as any)).toThrowError('Unknown product type');
    });

    describe('OS product type', () => {
      it('should create form with OS specific fields', () => {
        const form = service.createProductForm('os', undefined, testProducts);
        
        expect(form.contains('version')).toBeTruthy();
        expect(form.contains('supportedArchitectures')).toBeTruthy();
        
        const versionControl = form.get('version');
        versionControl?.setValue('invalid');
        expect(versionControl?.hasError('pattern')).toBeTruthy();
        versionControl?.setValue('1.0.0');
        expect(versionControl?.valid).toBeTruthy();
      });

      it('should patch values when data provided', () => {
        const data = {
          id: 'os-1',
          name: 'Windows',
          version: '10.0.0',
          supportedArchitectures: ['x64']
        };
        const form = service.createProductForm('os', data, testProducts);
        
        expect(form.value.id).toBe('os-1');
        expect(form.value.version).toBe('10.0.0');
      });
    });

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