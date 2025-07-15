import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "lib/domain/dtos/category/CreateCategoryDto";
import { UpdateCategoryDto } from "lib/domain/dtos/category/UpdateCateGoryDto";
import { Category } from "lib/domain/entities/Category.entity";
import { CategoryRepository } from "lib/domain/repositories/CategoryRepository";

@Injectable()
export class CategoryUseCases {
    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: them danh muc
    async create(createCategoryDto: CreateCategoryDto) {
        // Check exist category
        const existingCategory = await this.categoryRepository.getByName(createCategoryDto.name);

        // Log error
        if (existingCategory) {
            this.logger.error("Category is already in used", undefined, "At create category usecase");
            throw new ConflictException("Category is already in used");
        }

        // Create new instance
        const newInfor = Category.Create({
            name: createCategoryDto.name
        })

        // Create category
        const newCategory = await this.categoryRepository.persist(newInfor);

        // Log result
        this.logger.log("Create new category success", "At create category usecase");

        return newCategory;
    }

    // Usecase: sua danh muc
    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        // Check exist category
        const existingCategory = await this.categoryRepository.getById(id);

        // Log error
        if (!existingCategory) {
            this.logger.error("Cannot found category", undefined, "At update category usecase");
            throw new ConflictException("Cannot found category");
        }

        // Update category
        const updatedCategory = await this.categoryRepository.merge(id, updateCategoryDto);

        // Log result
        this.logger.log("Update category success", "At update category usecase");

        return updatedCategory;
    }

    // Usecase: xoa danh muc
    async remove(id: string) {
        // Check exist category
        const existingCategory = await this.categoryRepository.getById(id);

        // Log error
        if (!existingCategory) {
            this.logger.error("Cannot found category", undefined, "At delete category usecase");
            throw new ConflictException("Cannot found category");
        }

        // Delete category
        const deletedCategory = await this.categoryRepository.remove(id);

        // Log result
        this.logger.log("Delete category success", "At delete category usecase");

        return deletedCategory;
    }

    // Usecase: lay tat ca danh muc
    async find() {
        // Find all categories
        const foundResult = await this.categoryRepository.find();

        // Log error
        if (!foundResult) {
            this.logger.error("Cannot get all categories | there is no category", undefined, "At get all categories usecase");
            throw new NotFoundException("Cannot get all categories | there is no category")
        }

        return foundResult;
    }
}