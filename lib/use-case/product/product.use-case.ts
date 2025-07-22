import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "lib/domain/dtos/product/CreateProductDto";
import { UpdateProductDto } from "lib/domain/dtos/product/UpdatePriductDto";
import { Product } from "lib/domain/entities/Product.entity";
import { CategoryRepository } from "lib/domain/repositories/CategoryRepository";
import { ProductRepository } from "lib/domain/repositories/ProductRepository";

@Injectable()
export class ProductUseCases {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
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

        // Check existing category
        const existingCategory = await this.categoryRepository.getById(createProductDto.categoryId);

        // Log error
        if (!existingCategory) {
            this.logger.error(`Cannot find category [${createProductDto.categoryId}]`, undefined, "At create product usecase");
            throw new NotFoundException(`Cannot find category [${createProductDto.categoryId}]`);
        }

        // New instance
        const newInstance = Product.Create(createProductDto);

        // Create product
        const createdProduct = await this.productRepository.persist(newInstance);

        // Log result
        this.logger.log(`Create new product success`, "At create product usecase");

        return createdProduct;
    }

    // Usecase: Cập nhật sản phẩm
    async update(id: string, updateProductDto: UpdateProductDto) {
        // Validate data

        // Check existing product
        const existingProduct = await this.productRepository.getById(id);

        // Log error
        if (!existingProduct) {
            this.logger.error(`Cannot find product`, undefined, "At update product usecase");
            throw new ConflictException(`Cannot find product`);
        }

        // Check name
        if (updateProductDto.name) {
            const existingProduct = await this.productRepository.getByName(updateProductDto.name);

            // Log error
            if (existingProduct) {
                this.logger.error(`Product name [${updateProductDto.name}] is already existed`, undefined, "At create product usecase");
                throw new ConflictException(`Product name [${updateProductDto.name}] is already existed`);
            }
        }

        // Update product
        const updatedProduct = await this.productRepository.merge(id, updateProductDto);

        // Log result
        this.logger.log(`Update product success`, "At update product usecase");

        return updatedProduct;
    }

    // Usecase: xóa sản phẩm
    async remove(id: string) {
        // Validate data

        // Check existing product
        const existingProduct = await this.productRepository.getById(id);

        // Log error
        if (!existingProduct) {
            this.logger.error(`Cannot find product`, undefined, "At delete product usecase");
            throw new ConflictException(`Cannot find product`);
        }

        // Delete product
        const deletedProduct = await this.productRepository.remove(id);

        // Log result
        this.logger.log(`Delete product success`, "At delete product usecase");

        return deletedProduct;
    }

    // Usecase: lấy tất cả sản phẩm theo danh mục
    async findByCategory(categoryId: string) {

        // Check existing category
        const existingCategory = await this.categoryRepository.getById(categoryId);

        // Log error
        if (!existingCategory) {
            this.logger.error(`Cannot find category [${categoryId}]`, undefined, "At get product by category usecase");
            throw new NotFoundException(`Cannot find category [${categoryId}]`);
        }

        const productsByCategory = await this.productRepository.getByCategory(categoryId);

        // Log result
        this.logger.log(`Get all products by category success`, "At get product by category usecase");

        return productsByCategory;
    }

    // Usecase: lấy tất cả sản phẩm
    async find() {
        const allProducts = await this.productRepository.find();

        // Log result
        this.logger.log(`Get all products success`, "At get all products usecase");

        return allProducts;
    }
}