import { CreateProductDto } from "../dtos/product/CreateProductDto";

export class Product {
    private id: string;
    private name: string;
    private price: number;
    private image: string;
    private stock: number;
    private storage: number;

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getImage(): string {
        return this.image;
    }

    getStock(): number {
        return this.stock;
    }

    getStorage(): number {
        return this.storage;
    }

    static Create(data: CreateProductDto) {
        // Validate data

        return data;
    }
}