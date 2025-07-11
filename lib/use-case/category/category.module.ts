import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { CategoryUseCases } from "./category.use-case";

@Module({
    imports: [InfrastructureModule],
    providers: [CategoryUseCases],
    exports: [CategoryUseCases]
})
export class CategoryModule { }