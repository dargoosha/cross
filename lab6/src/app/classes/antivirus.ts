import { BaseProduct } from "./base_product";

export class Antivirus extends BaseProduct {
    constructor(
        id: string,
        name: string,
        price: number,
        description: string,
        private protectionLevel: string, 
        private supportedDevices: number 
    ) {
        super(id, name, price, description);
    }

    override getInfo(): string {
        return `${super.getInfo()}\nProtection Level: ${this.protectionLevel}\nSupported Devices: ${this.supportedDevices}`;
    }
}