import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { CategoryUseCases } from "./category.use-case";
import { CategoryController } from "lib/interface/controllers/category.controller";

@Module({
    imports: [InfrastructureModule],
    providers: [CategoryUseCases],
    controllers: [CategoryController],
    exports: [CategoryUseCases]
})
export class CategoryModule { }