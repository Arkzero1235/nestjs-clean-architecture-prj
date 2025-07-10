import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { InfrastructureModule } from 'lib/infrastructure/persistence/infrastructure.module';

@Module({
    imports: [InfrastructureModule],
    providers: [UserUseCases],
    exports: [UserUseCases]
})

export class UserModule { }
