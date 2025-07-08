import { Module } from "@nestjs/common";
import { IPasswordHasher } from "lib/application/service/IPasswordHasher";
import { UserRepository } from "lib/domain/repository/UserRepository";
import { PrismaUserRepository } from "lib/infrastructure/database/prisma-orm/UserRepositoryImpl";
import { BCryptPasswordHasher } from "../hash-service/BcryptPasswordHasher";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { JwtTokenService } from "../auth-service/token.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_jwt_secret', // 🔒 nên đưa vào .env file
            signOptions: { expiresIn: '1h' }, // ⏱ cấu hình thời gian sống
        }),
    ],
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: IPasswordHasher,
            useClass: BCryptPasswordHasher
        },
        {
            provide: 'ITokenService',
            useClass: JwtTokenService,
        }
    ],
    exports: [UserRepository, IPasswordHasher, 'ITokenService'],
})
export class InfrastructureModule { }