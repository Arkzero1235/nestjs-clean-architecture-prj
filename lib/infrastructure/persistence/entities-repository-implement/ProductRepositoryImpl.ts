import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateProductDto } from "lib/domain/dtos/product/CreateProductDto";
import { ProductDto } from "lib/domain/dtos/product/ResDto";
import { UpdateProductDto } from "lib/domain/dtos/product/UpdatePriductDto";
import { ProductRepository } from "lib/domain/repositories/ProductRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async persist(createProductDto: CreateProductDto): Promise<ProductDto | null> {
        try {
            const createdProduct = await this.prismaService.product.create({
                data: {
                    name: createProductDto.name,
                    image: createProductDto.image,
                    price: createProductDto.price,
                    stock: createProductDto.stock,
                    description: createProductDto.description,
                    storage: createProductDto.storage,
                    categoryId: createProductDto.categoryId

                }
            });

            return createdProduct;

        } catch (error) {
            throw new InternalServerErrorException("Cannot create product");
        }
    }

    merge(updateProductDto: UpdateProductDto): Promise<ProductDto | null> {
        throw new Error("Method not implemented.");
    }

    async remove(id: string): Promise<ProductDto | null> {
        try {
            const deletedProduct = await this.prismaService.product.delete({
                where: { id },
            });
            return deletedProduct;
        } catch (error) {
            throw new InternalServerErrorException("Cannot delete product");
        }
    }

    async find(): Promise<object | null> {
        try {
            const products = await this.prismaService.product.findMany({
                include: {
                    category: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return products;

        } catch (error) {
            throw new InternalServerErrorException("Cannot retrieve product list");
        }
    }

    async getById(id: string): Promise<ProductDto | null> {
        try {
            const getted_product = await this.prismaService.product.findFirst({
                where: {
                    id: id
                }
            })

            return getted_product;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async getByName(name: string): Promise<ProductDto | null> {
        try {
            const getted_product = await this.prismaService.product.findFirst({
                where: {
                    name: name
                }
            })

            return getted_product;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async updateStorage(productId: string, decrement: number): Promise<ProductDto | null> {
        try {
            const updated_storage_product = await this.prismaService.product.update({
                where: { id: productId },
                data: {
                    storage: {
                        decrement: decrement
                    }
                }
            });

            return updated_storage_product;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

}