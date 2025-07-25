import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { AuthUseCases } from "./auth.use-case";
import { AuthController } from "lib/interface/controllers/auth.controller";
import { UserModule } from "../user/user.module";

@Module({
    imports: [InfrastructureModule, UserModule],
    providers: [AuthUseCases],
    controllers: [AuthController],
    exports: [AuthUseCases]
})

export class AuthModule { }
