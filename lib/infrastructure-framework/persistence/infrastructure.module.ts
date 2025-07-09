import { Module } from "@nestjs/common";
import { IPasswordHasher } from "lib/domain-core/services/IPasswordHasher";
import { BCryptPasswordHasher } from "./other-repository-implement/BcryptPasswordHasher";
import { UserRepositoryImpl } from "./entities-repository-implement/UserRepositoryImpl";
import { PrismaService } from "../database/prisma-orm/prisma.service";
import { UserRepository } from "lib/domain-core/repositories/UserRepository";
import { AuthRepository } from "lib/domain-core/repositories/AuthRepository";
import { AuthRepositoryImpl } from "./entities-repository-implement/AuthRepositoryImpl";
import { CreateDtoMapper } from "../../presentation-interface-adapter/mappers/CreateDtoMapper";
import { ITokenService } from "lib/domain-core/services/ITokenService";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ITokenServiceImpl } from "../jwt/ITokenServiceImpl";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN') },
            }),
        }),
    ],
    providers: [
        {
            provide: ITokenService,
            useClass: ITokenServiceImpl
        },
        {
            provide: IPasswordHasher,
            useClass: BCryptPasswordHasher
        },
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl
        },
        {
            provide: AuthRepository,
            useClass: AuthRepositoryImpl
        },
        CreateDtoMapper,
        PrismaService
    ],
    exports: [IPasswordHasher, UserRepository, PrismaService, AuthRepository, CreateDtoMapper, ITokenService],
})
export class InfrastructureModule { }