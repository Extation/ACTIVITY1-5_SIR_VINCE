import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * Bootstrap function to initialize and start the NestJS application.
 * Sets up CORS, validation, static file serving, API prefix, Swagger documentation,
 * and starts the server on port 3001.
 *
 * Note: In the backend, 'src' is the source code directory where TypeScript files are written and developed.
 * 'dist' is the distribution/build directory where compiled JavaScript code and build artifacts are placed after running the build process (e.g., via npm run build).
 */
async function bootstrap() {
  // Create NestJS application instance with Express platform for static file serving
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for cross-origin requests from frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3105',
    credentials: true,
  });

  // Apply global validation pipe for automatic request validation
  app.useGlobalPipes(new ValidationPipe());

  // Serve static files from uploads directory for image access
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Set global API prefix for all routes
  app.setGlobalPrefix('api');

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Blog Platform API')
    .setDescription('A comprehensive blog platform API with authentication, posts, and comments')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start server on configured port
  const port = process.env.PORT || 3005;
  await app.listen(port);
  console.log(`Blog Platform NestJS API Server running at http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();
