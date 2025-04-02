import { Injectable } from '@angular/core';
import { SoftwareFactoryService } from './software-factory.service';
import { IProduct } from '../classes/Iproduct';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private jsonBinUrl = 'https://api.jsonbin.io/v3/b/67ec2a198a456b796680aae1/latest';
  private jsonBinKey = '$2a$10$FONQ3CRy4LKnYn3eqLJOvOxtDwoStWgJcN0joZJsFwlPS8LW/oLvG';
  
  private products: IProduct[] = [];
  private factory: SoftwareFactoryService;

  constructor(factory: SoftwareFactoryService) {
    this.factory = factory;
  }

  async fetchProducts(): Promise<void> {
    try {
      const response = await fetch(this.jsonBinUrl, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.jsonBinKey
        }
      });
      
      const data = await response.json();
      const productList = data.record || data; 

      this.products = productList.map((productData: any) =>
        this.factory.createProduct(productData.type, productData)
      );
    } catch (error) {
      console.error('Помилка завантаження продуктів:', error);
      throw error;
    }
  }

  addProduct(type: string, data: any): void {
    const product = this.factory.createProduct(type, data);
    this.products.push(product);
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(p => p.getId() === id);
  }
}
