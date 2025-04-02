import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ProductServiceService } from '../services/product-service.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../classes/Iproduct';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, CommonModule],
})
export class HomePage implements OnInit {
  products: IProduct[] = []; 

  constructor(private productService: ProductServiceService) {}

  async ngOnInit() {
    try {
      await this.productService.fetchProducts(); 
      this.products = this.productService.getProducts();
    } catch (error) {
      console.error('Помилка при завантаженні продуктів у компоненті:', error);
    }
  }

}