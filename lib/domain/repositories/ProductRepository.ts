import { CreateProductDto } from "../dtos/product/CreateProductDto";
import { UpdateProductDto } from "../dtos/product/UpdatePriductDto";

export abstract class ProductRepository {
    abstract persist(createProductDto: CreateProductDto): Promise<object | null>;
    abstract merge(updateProductDto: UpdateProductDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | null>;
    abstract find(): Promise<object | null>;
    abstract getById(id: string): Promise<object | null>;
}