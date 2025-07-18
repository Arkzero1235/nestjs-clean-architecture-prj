import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field không khai báo trong DTO
      transform: true, // chuyển đổi sang instance class
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Website bán hàng tiện lợi')
    .setDescription('Các API cho website bán hàng tiện lợi, tài khoản test (Admin): email: admin@example.com, password: test123@@')
    .setVersion('1.0.0')
    .addServer('http://localhost:3333/api/v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
