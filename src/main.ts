import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Turn from 'node-turn';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const server = new Turn({
    // set options
    authMech: 'none',
    credentials: {
      username: 'karas123456789',
    },
  });

  server.start();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
