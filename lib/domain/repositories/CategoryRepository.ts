import { CreateCategoryDto } from "../dtos/category/CreateCategoryDto";
import { UpdateCategoryDto } from "../dtos/category/UpdateCateGoryDto";

export abstract class CategoryRepository {
    abstract persist(createCategoryDto: CreateCategoryDto): Promise<object | null>;
    abstract merge(id: string, updateCategoryDto: UpdateCategoryDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | null>;
    abstract find(): Promise<object | null>;
    abstract getByName(name: string | undefined): Promise<object | null>;
    abstract getById(id: string | undefined): Promise<object | null>;
}