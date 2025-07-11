import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { AdminUsecases } from "./admin.use-case";

@Module({
    imports: [InfrastructureModule],
    providers: [AdminUsecases],
    exports: [AdminUsecases]
})
export class AdminModule { }