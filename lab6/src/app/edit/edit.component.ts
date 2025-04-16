import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../classes/Iproduct';
import { SoftwareFactoryService } from '../services/software-factory.service';
import { FormsFactoryService } from '../services/forms-factory.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButton, IonSelect, IonSelectOption, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AntivirusFormComponent } from '../forms/antivirus-form/antivirus-form.component';
import { DriverFormComponent } from '../forms/driver-form/driver-form.component';
import { OffsuiteFormComponent } from '../forms/offsuite-form/offsuite-form.component';
import { OsFormComponent } from '../forms/os-form/os-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [IonItem, 
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    CommonModule,
    AntivirusFormComponent,
    OffsuiteFormComponent,
    OsFormComponent,
    DriverFormComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditComponent implements OnInit {
  @Input() products: IProduct[] = [];
  selectedProductIndex: number | null = null;
  selectedProductType: string = 'antivirus';

  constructor(
    private softwareFactory: SoftwareFactoryService,
    private formsFactory: FormsFactoryService
  ) {}

  ngOnInit() {}

  onSelectProduct(event: any) {
    this.selectedProductIndex = event.detail.value;
    if (this.selectedProductIndex !== null) {
      const product = this.products[this.selectedProductIndex];
      this.selectedProductType = this.getProductType(product);
    }
  }

  getProductType(product: IProduct): string {
    if ('protectionLevel' in product) return 'antivirus';
    if ('includedApps' in product) return 'office';
    if ('version' in product && 'supportedArchitectures' in product) return 'os';
    if ('hardwareType' in product) return 'driver';
    return 'antivirus'; // Default fallback
  }

  onFormSubmit(formData: any) {
    if (this.selectedProductIndex !== null && this.products[this.selectedProductIndex]) {
      const updatedProduct = this.softwareFactory.createProduct(this.selectedProductType, formData);
      this.products[this.selectedProductIndex] = updatedProduct;
      console.log('Product updated:', updatedProduct);
      console.log('Updated products array:', this.products);
    }
  }

  onDeleteProduct() {
    if (this.selectedProductIndex !== null) {
      this.products.splice(this.selectedProductIndex, 1);
      this.selectedProductIndex = null;
      console.log('Product deleted');
      console.log('Updated products array:', this.products);
    }
  }
}