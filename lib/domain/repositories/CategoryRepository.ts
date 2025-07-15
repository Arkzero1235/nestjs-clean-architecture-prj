import { CategoryDto } from "../dtos/category/ResDto";
import { CreateCategoryDto } from "../dtos/category/CreateCategoryDto";
import { UpdateCategoryDto } from "../dtos/category/UpdateCateGoryDto";

export abstract class CategoryRepository {
    abstract persist(createCategoryDto: CreateCategoryDto): Promise<CategoryDto | null>;
    abstract merge(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto | null>;
    abstract remove(id: string): Promise<CategoryDto | null>;
    abstract find(): Promise<CategoryDto[] | null>;
    abstract getByName(name: string | undefined): Promise<CategoryDto | null>;
    abstract getById(id: string | undefined): Promise<CategoryDto | null>;
}