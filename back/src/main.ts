import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Api GreenShop')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(3100);
}

bootstrap();
