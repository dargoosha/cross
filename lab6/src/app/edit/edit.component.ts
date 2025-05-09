import { ProductServiceService } from './../services/product-service.service';
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
import { OtherFormComponent } from "../forms/other-form/other-form.component";



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
    ReactiveFormsModule, OtherFormComponent]
})
export class EditComponent implements OnInit {
  @Input() products: IProduct[] = [];
  selectedProductIndex: number | null = null;
  selectedProductType: string = 'antivirus';

  availableTypes: string[] = [];

  constructor(
    private softwareFactory: SoftwareFactoryService,
    private formsFactory: FormsFactoryService,
    private productService: ProductServiceService 
  ) {}

  ngOnInit() {
    this.availableTypes = this.getUniqueTypesFromProducts();
  }

  getUniqueTypesFromProducts(): string[] {
    const types = this.products.map(product => product.getType());
    return Array.from(new Set(types)); 
  }

  onChangeProductType(newType: string) {
    if (this.selectedProductIndex === null) return;
  
    const oldProduct = this.products[this.selectedProductIndex];
    const commonData = {
      id: oldProduct.getId(),
      name: oldProduct.getName(),
      price: oldProduct.getPrice(),
      description: oldProduct.getDescription(),
    };
  
    const newProduct = this.softwareFactory.createProduct(newType, commonData);
    this.products[this.selectedProductIndex] = newProduct;
    this.selectedProductType = newType;
  }

  onSelectProduct(event: any) {
    this.selectedProductIndex = event.detail.value;
    if (this.selectedProductIndex !== null) {
      const product = this.products[this.selectedProductIndex];
      this.selectedProductType = product.getType();
      this.availableTypes = this.getUniqueTypesFromProducts();
    }
  }

  async onFormSubmit(formData: any) {
    if (this.selectedProductIndex !== null && this.products[this.selectedProductIndex]) {
      const existingProduct = this.products[this.selectedProductIndex];
      const productId = existingProduct.getId();
      try {
        await this.productService.updateProduct(productId, this.selectedProductType, formData);
        console.log('Product updated in database:', formData);
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  }
  
  async onDeleteProduct() {
    if (this.selectedProductIndex !== null) {
      const product = this.products[this.selectedProductIndex];
      try {
        await this.productService.deleteProduct(product.getId());
        this.selectedProductIndex = null;
        console.log('Product deleted from database');
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  }

  typeToDelete: string | null = null;

onSelectTypeToDelete(type: string) {
  this.typeToDelete = type;
}

async onDeleteTypeCascade() {
  if (!this.typeToDelete) return;
  try {
    await this.productService.deleteProductsByType(this.typeToDelete);
    await this.productService.fetchProducts(); // Оновлення
    this.products = this.productService.getProducts(); // Локальне оновлення
    this.availableTypes = this.getUniqueTypesFromProducts();
    this.selectedProductIndex = null;
    this.typeToDelete = null;
    console.log(`Всі продукти типу "${this.typeToDelete}" видалено.`);
  } catch (error) {
    console.error('Помилка каскадного видалення:', error);
  }
}
}