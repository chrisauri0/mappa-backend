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

  // Endpoint de depuración de rutas (sólo en desarrollo)
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance(); // Instancia de Express

  expressApp.get('/debug-routes', (req, res) => {
    const router = expressApp._router;

    if (!router) {
      return res.status(500).json({ error: 'Router no disponible' });
    }

    const routes = router.stack
      .filter((layer) => layer.route)
      .map((layer) => ({
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
        path: layer.route.path,
      }));

    res.json(routes);
  });

  // Para despliegue en Vercel
  if (process.env.NEST_ENV === 'vercel') {
    module.exports = serverless(server);
  } else {
    await app.listen(process.env.PORT ?? 5000);
  }
}

bootstrap();
