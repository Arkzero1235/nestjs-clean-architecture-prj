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

    async merge(id: string, updateProductDto: UpdateProductDto): Promise<ProductDto | null> {
        try {
            // Filter undefined or null data
            const data: any = {
                ...(updateProductDto.name && { name: updateProductDto.name }),
                ...(updateProductDto.price !== undefined && updateProductDto.price !== null && { price: updateProductDto.price }),
                ...(updateProductDto.image && { image: updateProductDto.image }),
                ...(updateProductDto.stock !== undefined && updateProductDto.stock !== null && { stock: updateProductDto.stock }),
                ...(updateProductDto.description && { description: updateProductDto.description }),
                ...(updateProductDto.storage !== undefined && updateProductDto.storage !== null && updateProductDto.storage >= 1 && { storage: updateProductDto.storage }),
                ...(updateProductDto.categoryId && { categoryId: updateProductDto.categoryId })
            }

            const updated_result = await this.prismaService.product.update({
                where: {
                    id: id
                },
                data
            })

            return updated_result;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
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

    async find(): Promise<object[] | null> {
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
            console.log("LOI LA: ", error);
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

            if (!getted_product) return null;

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

            if (!getted_product) return null;

            return getted_product;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async getByCategory(categoryId: string): Promise<object[] | null> {
        try {
            const getted_product = await this.prismaService.product.findMany({
                where: {
                    categoryId: categoryId
                },
                include: {
                    category: true
                }
            })

            if (!getted_product) return null

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