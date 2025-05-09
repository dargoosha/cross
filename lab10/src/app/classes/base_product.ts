import { IProduct } from "./Iproduct";

export abstract class BaseProduct implements IProduct {
    constructor(
      private type: string,
      private id: string,
      private name: string,
      private price: number,
      private description: string
    ) {}
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    getPrice(): number {
      return this.price;
    }
  
    getDescription(): string {
      return this.description;
    }

    getType(): string {
      return this.type;
    }

    getInfo(): string {
      return `ID: ${this.id}\nName: ${this.name}\nPrice: $${this.price}\nDescription: ${this.description}`;
  }
  }