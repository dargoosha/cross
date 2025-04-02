import { BaseProduct } from "./base_product";

export class OfficeSuite extends BaseProduct {
    constructor(
        id: string,
        name: string,
        price: number,
        description: string,
        private includedApps: string[], // Unique field: list of applications in the suite
        private isSubscription: boolean // Unique field: subscription-based or one-time purchase
    ) {
        super(id, name, price, description);
    }

    override getInfo(): string {
        return `${super.getInfo()}\nIncluded Applications: ${this.includedApps.join(', ')}\nType: ${this.isSubscription ? 'Subscription' : 'One-time Purchase'}`;
    }
}