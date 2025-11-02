import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS first
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3005', 'http://localhost:3004'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization'],
  });

  // Add middleware to log all requests
  app.use((req, res, next) => {
    if (req.method === 'POST' && req.url.includes('/auth/login')) {
      console.log('\n🌐 ===== INCOMING LOGIN REQUEST =====');
      console.log('Method:', req.method);
      console.log('URL:', req.url);
      console.log('Headers:', JSON.stringify(req.headers, null, 2));
      console.log('Content-Type:', req.headers['content-type']);
      console.log('Body (raw):', req.body);
      console.log('Body type:', typeof req.body);
      console.log('=====================================\n');
    }
    next();
  });

  // Global validation pipe with better error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      exceptionFactory: (errors) => {
        console.log('\n❌ ===== VALIDATION PIPE ERROR =====');
        console.log('Number of validation errors:', errors.length);
        
        const formattedErrors = errors.map((error) => {
          console.log('\nField:', error.property);
          console.log('  Value:', error.value);
          console.log('  Type:', typeof error.value);
          console.log('  Constraints:', error.constraints);
          
          const constraints = error.constraints || {};
          const messages = Object.values(constraints);
          return `${error.property}: ${messages.join(', ')}`;
        });
        
        console.log('\nFormatted errors:', formattedErrors);
        console.log('===================================\n');
        
        return new BadRequestException({
          statusCode: 400,
          message: formattedErrors.join('. '),
          error: 'Bad Request',
        });
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('Personal Notes App with Authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3004);
  console.log('Notes API is running on http://localhost:3004');
  console.log('Swagger documentation available at http://localhost:3004/api');
}
bootstrap();
