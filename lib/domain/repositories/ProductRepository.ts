import { CreateProductDto } from "../dtos/product/CreateProductDto";
import { ProductDto } from "../dtos/product/ResDto";
import { UpdateProductDto } from "../dtos/product/UpdatePriductDto";

export abstract class ProductRepository {
    abstract persist(createProductDto: CreateProductDto): Promise<ProductDto | null>;
    abstract merge(id: string, updateProductDto: UpdateProductDto): Promise<ProductDto | null>;
    abstract remove(id: string): Promise<ProductDto | null>;
    abstract find(): Promise<object | null>;
    abstract getById(id: string): Promise<ProductDto | null>;
    abstract getByName(name: string): Promise<ProductDto | null>;
    abstract updateStorage(productId: string, decrement: number): Promise<ProductDto | null>;
}