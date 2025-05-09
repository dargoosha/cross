import { Injectable } from '@angular/core';
import { SoftwareFactoryService } from './software-factory.service';
import { IProduct } from '../classes/Iproduct';
import { Database, ref, get, set, update, remove } from '@angular/fire/database';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private db: Database = inject(Database);
  private products: IProduct[] = [];

  constructor(private factory: SoftwareFactoryService) {}

  async fetchProducts(): Promise<void> {
    try {
      const productsRef = ref(this.db, 'products');
      const snapshot = await get(productsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        this.products = Object.values(data).map((productData: any) =>
          this.factory.createProduct(productData.type, productData)
        );
      } else {
        console.log('Дані не знайдено!');
      }
    } catch (error) {
      console.error('Помилка завантаження продуктів з Firebase:', error);
      throw error;
    }
  }

  getProducts(): IProduct[] {
    return this.products;
  }

}
