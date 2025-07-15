import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { OrderDetailUseCases } from "./order-detail.use-case";
import { OrderDetailController } from "lib/interface/controllers/order-detail.controller";

@Module({
    imports: [InfrastructureModule],
    providers: [OrderDetailUseCases],
    controllers: [OrderDetailController],
    exports: [OrderDetailUseCases]
})
export class OrderDetailModule { }