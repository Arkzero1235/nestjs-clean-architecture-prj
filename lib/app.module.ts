import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-case/user/user.module';
import { AuthModule } from './use-case/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.config';
import { AdminModule } from './use-case/admin/admin.module';
import { CategoryModule } from './use-case/category/category.module';
import { CommentModule } from './use-case/comment/comment.module';
import { OrderModule } from './use-case/order/order.module';
import { AuthController } from './interface/controllers/auth.controller';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot({
      isGlobal: true, // cho phép dùng ở mọi nơi
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    AdminModule,
    CategoryModule,
    CommentModule,
    OrderModule
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: Logger,
      useExisting: WINSTON_MODULE_NEST_PROVIDER,
    },
  ],
})
export class AppModule { }
