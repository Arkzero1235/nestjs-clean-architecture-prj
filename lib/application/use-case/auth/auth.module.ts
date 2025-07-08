import { Module } from '@nestjs/common';
import { AuthUseCase } from './auth.use-case';
import { AuthRepository } from 'lib/domain/repository/AuthRepository';
import { AuthRepositoryImpl } from 'lib/infrastructure/database/prisma-orm/AuthRepositoryImpl';
import { InfrastructureModule } from 'lib/infrastructure/services/data-service/data-service.module';


@Module({
    imports: [InfrastructureModule],
    providers: [
        AuthUseCase,
        {
            provide: AuthRepository,
            useClass: AuthRepositoryImpl
        }
    ],
    exports: [AuthUseCase]
})
export class AuthModule { }


