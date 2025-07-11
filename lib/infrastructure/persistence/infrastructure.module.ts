import { Logger, Module } from "@nestjs/common";
import { IPasswordHasher } from "lib/domain/services/IPasswordHasher";
import { BCryptPasswordHasher } from "./other-repository-implement/BcryptPasswordHasher";
import { UserRepositoryImpl } from "./entities-repository-implement/UserRepositoryImpl";
import { PrismaService } from "../database/prisma-orm/prisma.service";
import { UserRepository } from "lib/domain/repositories/UserRepository";
import { AuthRepository } from "lib/domain/repositories/AuthRepository";
import { AuthRepositoryImpl } from "./entities-repository-implement/AuthRepositoryImpl";
import { ReqMapper } from "lib/interface/mappers/ReqMapper";
import { ITokenService } from "lib/domain/services/ITokenService";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ITokenServiceImpl } from "../jwt/ITokenServiceImpl";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AdminRepository } from "lib/domain/repositories/AdminRepository";
import { AdminRepositoryImpl } from "./entities-repository-implement/AdminRepositoryImpl";
import { CategoryRepository } from "lib/domain/repositories/CategoryRepository";
import { CategoryRepositoryImpl } from "./entities-repository-implement/CategoryRepositoryImpl";
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
        ReqMapper,
        PrismaService,
        {
            provide: ITokenService,
            useClass: ITokenServiceImpl
        },
        {
            provide: IPasswordHasher,
            useClass: BCryptPasswordHasher
        },
        {
            provide: Logger,
            useExisting: WINSTON_MODULE_NEST_PROVIDER,
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
            provide: AdminRepository,
            useClass: AdminRepositoryImpl
        },
        {
            provide: CategoryRepository,
            useClass: CategoryRepositoryImpl
        }
    ],
    exports: [
        ReqMapper,
        ITokenService,
        Logger,
        IPasswordHasher,
        UserRepository,
        PrismaService,
        AuthRepository,
        AdminRepository,
        CategoryRepository
    ],
})
export class InfrastructureModule { }