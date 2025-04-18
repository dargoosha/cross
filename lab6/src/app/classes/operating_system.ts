import { BaseProduct } from "./base_product";

export class OperatingSystem extends BaseProduct {
  constructor(
      id: string,
      name: string,
      price: number,
      description: string,
      private version: string, // Unique field: OS version
      private supportedArchitectures: string[] // Unique field: x86, x64, ARM, etc.
  ) {
      super(id, name, price, description);
  }

  override getInfo(): string {
      return `${super.getInfo()}\nVersion: ${this.version}\nSupported Architectures: ${this.supportedArchitectures.join(', ')}`;
  }
}