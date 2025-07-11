import { CreateProductDto } from "../dtos/product/CreateProductDto";

export class Product {
    private id: string;
    private name: string;
    private price: number;
    private image: string;
    private stock: number;
    private views: number;

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

    getViews(): number {
        return this.views;
    }

    static Create(data: CreateProductDto) {
        // Validate data

        return data;
    }
}