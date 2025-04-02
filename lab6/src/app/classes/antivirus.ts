import { BaseProduct } from "./base_product";

export class Antivirus extends BaseProduct {
    constructor(
        id: string,
        name: string,
        price: number,
        description: string,
        private protectionLevel: string, // Unique field: Basic, Advanced, Premium
        private supportedDevices: number // Unique field: number of devices supported
    ) {
        super(id, name, price, description);
    }

    override getInfo(): string {
        return `${super.getInfo()}\nProtection Level: ${this.protectionLevel}\nSupported Devices: ${this.supportedDevices}`;
    }
}