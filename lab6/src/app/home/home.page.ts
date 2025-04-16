import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { ProductServiceService } from '../services/product-service.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../classes/Iproduct';
import { ReviewComponent } from "../review/review.component";
import { EditComponent } from "../edit/edit.component";
import { AddComponent } from "../add/add.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, CommonModule, ReviewComponent, EditComponent, AddComponent, FormsModule],
})
export class HomePage implements OnInit {
  products: IProduct[] = [];
  selectedSegment: string = 'review';

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