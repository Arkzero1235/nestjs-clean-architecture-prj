import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { ProductController } from "lib/interface/controllers/product.controller";
import { ProductUseCases } from "./product.use-case";

@Module({
    imports: [InfrastructureModule],
    providers: [ProductUseCases],
    controllers: [ProductController],
    exports: [ProductUseCases]
})
export class ProductModule { }