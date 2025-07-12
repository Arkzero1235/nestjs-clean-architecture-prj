import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { OrderUseCases } from "./order.use-case";
import { OrderController } from "lib/interface/controllers/order.controller";

@Module({
    imports: [InfrastructureModule],
    providers: [OrderUseCases],
    controllers: [OrderController],
    exports: [OrderUseCases]
})
export class OrderModule { }