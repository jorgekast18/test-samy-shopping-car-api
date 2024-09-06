import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config swagger
  const config = new DocumentBuilder()
    .setTitle('Samy Challenge - Carrito de Compras API')
    .setDescription('API para gestionar un carrito de compras')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api/v1')
    .build(); 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/', app, document);
  
  const i18nService = app.get(I18nService);

  // Filters and pipes
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(i18nService));

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
