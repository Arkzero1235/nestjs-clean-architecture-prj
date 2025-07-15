import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { AuthUseCases } from "./auth.use-case";

@Module({
    imports: [InfrastructureModule],
    providers: [AuthUseCases],
    exports: [AuthUseCases]
})

export class AuthModule { }
