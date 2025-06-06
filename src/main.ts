import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Mi Proyecto')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.init();
  await app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || 5000}`);
  });
}

bootstrap();
