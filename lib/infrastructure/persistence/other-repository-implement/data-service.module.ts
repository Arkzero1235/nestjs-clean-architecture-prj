import { Module } from "@nestjs/common";
import { IPasswordHasher } from "lib/domain/services/IPasswordHasher";
import { BCryptPasswordHasher } from "./BcryptPasswordHasher";
import { JwtTokenService } from "../../jwt/token.service";
import { JwtModule } from "@nestjs/jwt";
import { UserRepositoryImpl } from "../entities-repository-implement/UserRepositoryImpl";
import { PrismaService } from "../../database/prisma-orm/prisma.service";
import { UserRepository } from "lib/domain/repositories/UserRepository";
import { AuthRepository } from "lib/domain/repositories/AuthRepository";
import { AuthRepositoryImpl } from "../entities-repository-implement/AuthRepositoryImpl";

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_jwt_secret', // 🔒 nên đưa vào .env file
            signOptions: { expiresIn: '1h' }, // ⏱ cấu hình thời gian sống
        }),
    ],
    providers: [
        {
            provide: IPasswordHasher,
            useClass: BCryptPasswordHasher
        },
        {
            provide: 'ITokenService',
            useClass: JwtTokenService,
        },
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl
        },
        {
            provide: AuthRepository,
            useClass: AuthRepositoryImpl
        },
        PrismaService
    ],
    exports: [IPasswordHasher, 'ITokenService', UserRepository, PrismaService, AuthRepository],
})
export class InfrastructureModule { }