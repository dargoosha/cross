import { BaseProduct } from "./base_product";

export class Driver extends BaseProduct {
    constructor(
        type: string,
        id: string,
        name: string,
        price: number,
        description: string,
        private hardwareType: string, 
        private version: string 
    ) {
        super(type, id, name, price, description);
    }

    override getInfo(): string {
        return `${super.getInfo()}\nHardware Type: ${this.hardwareType}\nVersion: ${this.version}`;
    }
}