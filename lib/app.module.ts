import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './application/use-case/user/user.module';
import { UserController } from './presentation-interface-adapter/controllers/user.controller';
import { AuthController } from './presentation-interface-adapter/controllers/auth.controller';
import { AuthModule } from './application/use-case/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // cho phép dùng ở mọi nơi
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController
  ],
  providers: [AppService],
})
export class AppModule { }
