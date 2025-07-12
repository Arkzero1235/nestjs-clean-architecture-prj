import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { InfrastructureModule } from 'lib/infrastructure/persistence/infrastructure.module';
import { UserController } from 'lib/interface/controllers/user.controller';

@Module({
    imports: [InfrastructureModule],
    providers: [UserUseCases],
    controllers: [UserController],
    exports: [UserUseCases]
})

export class UserModule { }
