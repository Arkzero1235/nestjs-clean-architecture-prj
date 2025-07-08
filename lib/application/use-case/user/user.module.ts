import { Module } from '@nestjs/common';
import { UserFactoryService } from './user.factory';
import { UserUseCases } from './user.use-case';
import { InfrastructureModule } from 'lib/infrastructure/services/data-service/data-service.module';


@Module({
    imports: [InfrastructureModule],
    providers: [
        UserFactoryService,
        UserUseCases
    ],
    exports: [
        UserFactoryService,
        UserUseCases
    ]
})
export class UserModule { }
