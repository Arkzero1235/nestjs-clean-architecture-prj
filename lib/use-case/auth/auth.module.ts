import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { AuthUseCase } from "./auth.use-case";

@Module({
    imports: [InfrastructureModule],
    providers: [AuthUseCase],
    exports: [AuthUseCase]
})

export class AuthModule { }
