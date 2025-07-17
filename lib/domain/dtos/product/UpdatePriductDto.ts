export class UpdateProductDto {
    name?: string;
    price?: number;
    image?: string;
    stock?: number;
    description?: string;
    storage?: number;
    categoryId: string;
}