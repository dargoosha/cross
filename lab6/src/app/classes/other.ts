import { BaseProduct } from "./base_product";

export class Other extends BaseProduct {
    constructor(
        type: string,
        id: string,
        name: string,
        price: number,
        description: string,
    ) {
        super( type, id, name, price, description);
    }

    override getInfo(): string {
        return `${super.getInfo()}\nType: ${this.getType()}\nName: ${this.getName()}\nPrice: $${this.getPrice()}}`;
    }
}