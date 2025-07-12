import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { AdminUsecases } from "./admin.use-case";
import { AdminController } from "lib/interface/controllers/admin.controller";

@Module({
    imports: [InfrastructureModule],
    providers: [AdminUsecases],
    controllers: [AdminController],
    exports: [AdminUsecases]
})
export class AdminModule { }