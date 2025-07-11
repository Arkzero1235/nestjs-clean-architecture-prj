import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-case/user/user.module';
import { UserController } from './interface/controllers/user.controller';
import { AuthController } from './interface/controllers/auth.controller';
import { AuthModule } from './use-case/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.config';
import { AdminModule } from './use-case/admin/admin.module';
import { AdminController } from './interface/controllers/admin.controller';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot({
      isGlobal: true, // cho phép dùng ở mọi nơi
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    AdminModule
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    AdminController
  ],
  providers: [
    AppService,
    {
      provide: Logger,
      useExisting: WINSTON_MODULE_NEST_PROVIDER,
    },
  ],
})
export class AppModule { }
