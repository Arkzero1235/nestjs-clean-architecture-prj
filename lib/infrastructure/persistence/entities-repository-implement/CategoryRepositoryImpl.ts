import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CategoryDto } from "lib/domain/dtos/category/ResDto";
import { CreateCategoryDto } from "lib/domain/dtos/category/CreateCategoryDto";
import { UpdateCategoryDto } from "lib/domain/dtos/category/UpdateCateGoryDto";
import { CategoryRepository } from "lib/domain/repositories/CategoryRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly logger: Logger
    ) { }

    async persist(createCategoryDto: CreateCategoryDto): Promise<CategoryDto | null> {
        try {
            // Create new category
            const create_category_result = await this.prismaService.category.create({
                data: {
                    name: createCategoryDto.name
                }
            })

            return ResMapper.mapResponseCategoryDto(create_category_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async merge(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto | null> {
        try {
            if (!updateCategoryDto.name) {
                return null;
            }

            // Filter undefined/null value
            const data: any = {
                ...(updateCategoryDto.name && { name: updateCategoryDto.name })
            }

            const update_category_result = await this.prismaService.category.update({
                where: {
                    id: id
                },
                data
            })

            return ResMapper.mapResponseCategoryDto(update_category_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async remove(id: string): Promise<CategoryDto | null> {
        try {
            // Delete category (WARNING: All product datas will be lost)
            const delete_category_result = await this.prismaService.category.delete({
                where: {
                    id: id
                }
            })

            return ResMapper.mapResponseCategoryDto(delete_category_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async find(): Promise<CategoryDto[] | null> {
        try {
            // Get all categories
            const get_all_categories_result = await this.prismaService.category.findMany();

            if (!get_all_categories_result) {
                return null;
            }

            return ResMapper.mapResponseCategoryDtoList(get_all_categories_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getByName(name: string): Promise<CategoryDto | null> {
        try {
            // Get all categories
            const get_categories_by_id_result = await this.prismaService.category.findFirst({
                where: {
                    name: name
                }
            })

            if (!get_categories_by_id_result) {
                return null;
            }

            return ResMapper.mapResponseCategoryDto(get_categories_by_id_result);
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getById(id: string | undefined): Promise<CategoryDto | null> {
        try {
            // Get all categories
            const get_categories_by_id_result = await this.prismaService.category.findFirst({
                where: {
                    id: id
                }
            })

            if (!get_categories_by_id_result) {
                return null;
            }

            return ResMapper.mapResponseCategoryDto(get_categories_by_id_result);
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }


}