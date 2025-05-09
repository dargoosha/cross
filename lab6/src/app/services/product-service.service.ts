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

  async updateProduct(id: string, type: string, data: any): Promise<void> {
    const productRef = ref(this.db, `products/${id}`);
    const updatedProduct = this.factory.createProduct(type, data);
    await update(productRef, { ...data, type });
    const index = this.products.findIndex(p => p.getId() === id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
    await this.fetchProducts();
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = ref(this.db, `products/${id}`);
      await remove(productRef); 

      const index = this.products.findIndex(p => p.getId() === id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      await this.fetchProducts();
    } catch (error) {
      console.error(`Помилка видалення продукту з id ${id}:`, error);
      throw error;
    }
  }
  

  getProductById(id: string): IProduct | undefined {
    return this.products.find(p => p.getId() === id);
  }

  private generateId(type: string): string {
    const prefixMap: Record<string, string> = {
      os: 'OS',
      antivirus: 'AV',
      office: 'OFF',
      driver: 'DR'
    };
    const prefix = prefixMap[type] || type.toUpperCase();
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${randomString}`;
  }
  async addProduct(type: string, data: any): Promise<IProduct> {

    const id = this.generateId(type);
    var productData = {};
    if (type === 'other') {
      productData = { ...data, id };
    } else {
      productData = { ...data, type, id };
    }
    
    const newProduct = this.factory.createProduct(type, productData);
    await set(ref(this.db, `products/${id}`), productData);
    await this.fetchProducts();
    return newProduct;
  }

  async deleteProductsByType(type: string): Promise<void> {
    try {
      const productsRef = ref(this.db, 'products');
      const snapshot = await get(productsRef);
  
      if (snapshot.exists()) {
        const data = snapshot.val();
        const deletions = Object.entries(data)
          .filter(([_, prod]: any) => prod.type === type)
          .map(([key, _]) => remove(ref(this.db, `products/${key}`)));
  
        await Promise.all(deletions);
        console.log(`Видалено всі продукти типу: ${type}`);
      }
      this.products = this.products.filter(product => product.getType() !== type);
      await this.fetchProducts(); 
    } catch (error) {
      console.error(`Помилка видалення продуктів типу ${type}:`, error);
      throw error;
    }
  }
}
