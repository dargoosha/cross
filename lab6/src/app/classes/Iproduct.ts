export interface IProduct {
    getId(): string;
    getName(): string;
    getPrice(): number;
    getDescription(): string;
    getInfo(): string; 
    getType(): string;
}