import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { CreateProductDto } from "lib/domain/dtos/product/CreateProductDto";
import { Product } from "lib/domain/entities/Product.entity";
import { ProductRepository } from "lib/domain/repositories/ProductRepository";

@Injectable()
export class ProductUseCases {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: Tạo mới 1 sản phẩm
    async create(createProductDto: CreateProductDto) {
        // Validate data

        // Check existing product
        const existingProduct = await this.productRepository.getByName(createProductDto.name);

        // Log error
        if (existingProduct) {
            this.logger.error(`Product name [${createProductDto.name}] is already existed`, undefined, "At create product usecase");
            throw new ConflictException(`Product name [${createProductDto.name}] is already existed`);
        }

        // New instance
        const newInstance = Product.Create(createProductDto);

        // Create product
        const createdProduct = await this.productRepository.persist(createProductDto);

        // Log result
        this.logger.log(`Create new product success`, "At create product usecase");

        return createdProduct;
    }

    // Usecase: Cập nhật sản phẩm

    // Usecase: xóa sản phẩm

    // Usecase: lấy tất cả san phẩm
}