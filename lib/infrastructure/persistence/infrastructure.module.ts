import { Logger, Module } from "@nestjs/common";
import { IPasswordHasher } from "lib/domain/services/IPasswordHasher";
import { BCryptPasswordHasher } from "./other-repository-implement/BcryptPasswordHasher";
import { UserRepositoryImpl } from "./entities-repository-implement/UserRepositoryImpl";
import { PrismaService } from "../database/prisma-orm/prisma.service";
import { UserRepository } from "lib/domain/repositories/UserRepository";
import { AuthRepository } from "lib/domain/repositories/AuthRepository";
import { AuthRepositoryImpl } from "./entities-repository-implement/AuthRepositoryImpl";
import { CreateDtoMapper } from "lib/interface/mappers/CreateDtoMapper";
import { ITokenService } from "lib/domain/services/ITokenService";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ITokenServiceImpl } from "../jwt/ITokenServiceImpl";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
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
        {
            provide: Logger,
            useExisting: WINSTON_MODULE_NEST_PROVIDER,
        },
        CreateDtoMapper,
        PrismaService
    ],
    exports: [
        IPasswordHasher,
        UserRepository,
        PrismaService,
        AuthRepository,
        CreateDtoMapper,
        ITokenService,
        Logger
    ],
})
export class InfrastructureModule { }