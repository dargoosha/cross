import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonItem, IonSelect, IonSelectOption, IonLabel, IonList } from '@ionic/angular/standalone';
import { IProduct } from '../classes/Iproduct';
import { ProductServiceService } from '../services/product-service.service';
import { VersionPipe } from './version.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonList, IonLabel, IonItem, IonSpinner, IonHeader, IonToolbar, IonTitle, IonContent, VersionPipe, IonSelect, IonSelectOption, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  products: IProduct[] = [];
  selectedSegment: string = 'review';
  isLoading: boolean = true;

  selectedType: string = ''; // для збереження типу

get filteredProducts(): IProduct[] {
  if (!this.selectedType) {
    return this.products;
  }
  return this.products.filter(p => p.getType().toLowerCase() === this.selectedType.toLowerCase());
}


  constructor(private productService: ProductServiceService) {}

  uniqueTypes: string[] = [];

async ngOnInit() {
  this.isLoading = true;
  try {
    await this.productService.fetchProducts();
    this.products = this.productService.getProducts();

    // Отримуємо унікальні типи
    this.uniqueTypes = [...new Set(this.products.map(p => p.getType()))];
  } catch (error) {
    console.error('Помилка при завантаженні продуктів у компоненті:', error);
  } finally {
    this.isLoading = false;
  }
}

}
