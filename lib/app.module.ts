import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './application/use-case/user/user.module';
import { UserController } from './interfaces/user.controller';
import { AuthModule } from './application/use-case/auth/auth.module';
import { AuthController } from './interfaces/auth.controller';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [
    AppController,
    AuthController,
    UserController
  ],
  providers: [AppService],
})
export class AppModule { }
