import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/other-repository-implement/data-service.module";
import { AuthUseCase } from "./auth.use-case";

@Module({
    imports: [InfrastructureModule],
    providers: [AuthUseCase],
    exports: [AuthUseCase]
})

export class AuthModule { }
