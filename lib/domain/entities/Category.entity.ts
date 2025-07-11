import { CreateCategoryDto } from "../dtos/category/CreateCategoryDto";

export class Category {
    private id: string;
    private name: string;

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    static Create(data: CreateCategoryDto) {
        // Validate data

        return data;
    }
}