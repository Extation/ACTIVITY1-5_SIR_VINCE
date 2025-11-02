import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3106',
    credentials: true,
  });

  const port = process.env.PORT || 3006;
  await app.listen(port);

  console.log(`🚀 Bookshelf API is running on: http://localhost:${port}`);
}
bootstrap();
