import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../classes/Iproduct';
import { SoftwareFactoryService } from '../services/software-factory.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AntivirusFormComponent } from '../forms/antivirus-form/antivirus-form.component';
import { DriverFormComponent } from '../forms/driver-form/driver-form.component';
import { OffsuiteFormComponent } from '../forms/offsuite-form/offsuite-form.component';
import { OsFormComponent } from '../forms/os-form/os-form.component';
import { FormsModule } from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';
import { OtherFormComponent } from "../forms/other-form/other-form.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    CommonModule,
    AntivirusFormComponent,
    OffsuiteFormComponent,
    OsFormComponent,
    DriverFormComponent,
    FormsModule,
    OtherFormComponent
]
})
export class AddComponent implements OnInit {
  @Input() products: IProduct[] = [];
  selectedProductType: string = 'antivirus';

    constructor(
    private softwareFactory: SoftwareFactoryService,
    private productService: ProductServiceService
  ) {}

  ngOnInit() {}

  onSegmentChange(event: any) {
    this.selectedProductType = event.detail.value;
  }

  async onFormSubmit(formData: any) {
    if (formData) {
      try {
        const newProduct = await this.productService.addProduct(this.selectedProductType, formData);
        this.products.push(newProduct);
        console.log('Продукт додано:', newProduct);
      } catch (error) {
        console.error('Помилка додавання продукту:', error);
      }
    }
  }
}