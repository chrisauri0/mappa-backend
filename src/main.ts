import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: '*', // Ajusta según sea necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();

  if (process.env.NEST_ENV === 'vercel') {
    module.exports = serverless(server);
  } else {
    await app.listen(process.env.PORT ?? 5000);
  }
}

bootstrap();
