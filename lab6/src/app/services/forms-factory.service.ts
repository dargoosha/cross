import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsFactoryService {
  constructor(private fb: FormBuilder) {}

  private getCommonFields(products?: any[]): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/), Validators.maxLength(50), this.uniqueIdValidator(products)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0), this.priceRangeValidator()]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  private uniqueIdValidator(products: any[] = []): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      const isDuplicate = products.some(product => product.id === control.value);
      return isDuplicate ? { uniqueId: { value: control.value } } : null;
    };
  }

  private priceRangeValidator(): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      const price = parseFloat(control.value);
      return price >= 1 && price <= 10000 ? null : { priceRange: { value: control.value } };
    };
  }

  createProductForm(type: string, data?: any, products?: any[]): FormGroup {
    let form: FormGroup;

    switch (type) {
      case 'os':
        form = this.getCommonFields(products);
        form.addControl('version', this.fb.control(data?.version || '', [Validators.required, Validators.pattern(/^\d+\.\d+(\.\d+)?$/)]));
        form.addControl('supportedArchitectures', this.fb.control(data?.supportedArchitectures || [], [Validators.required, Validators.minLength(1)]));
        break;

      case 'antivirus':
        form = this.getCommonFields(products);
        form.addControl('protectionLevel', this.fb.control(data?.protectionLevel || 'Basic', [Validators.required, Validators.pattern(/^(Basic|Advanced|Premium)$/)]));
        form.addControl('supportedDevices', this.fb.control(data?.supportedDevices || 1, [Validators.required, Validators.min(1)]));
        break;

      case 'office':
        form = this.getCommonFields(products);
        form.addControl('includedApps', this.fb.control(data?.includedApps || [], [Validators.required, Validators.minLength(1)]));
        form.addControl('isSubscription', this.fb.control(data?.isSubscription || false, [Validators.required]));
        break;

      case 'driver':
        form = this.getCommonFields(products);
        form.addControl('hardwareType', this.fb.control(data?.hardwareType || '', [Validators.required, Validators.pattern(/^(GPU|Printer|Network|Other)$/)]));
        form.addControl('version', this.fb.control(data?.version || '', [Validators.required, Validators.pattern(/^\d+\.\d+(\.\d+)?$/)]));
        break;

      default:
        throw new Error('Unknown product type');
    }

    if (data) {
      form.patchValue(data);
    }

    return form;
  }
}