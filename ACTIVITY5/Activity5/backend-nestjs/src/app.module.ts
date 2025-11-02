import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { HealthController } from './health.controller';

import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';

/**
 * Root application module that configures the entire NestJS application.
 * Imports all feature modules, sets up database connection, authentication,
 * file upload handling, and registers global controllers.
 * This is the entry point for module configuration in the Blog Platform backend.
 */
@Module({
  imports: [
    // Global configuration module for environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Database configuration with SQLite and TypeORM entities
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.db',
      entities: [User, Post, Comment],
      synchronize: true, // Auto-sync schema (development only)
    }),
    // Passport module for authentication strategies
    PassportModule,
    // JWT module for token-based authentication
    JwtModule.register({
      secret: 'your-secret-key', // In production, use environment variable
      signOptions: { expiresIn: '24h' },
    }),
    // Multer module for file upload handling
    MulterModule.register({
      dest: './uploads',
    }),
    // Feature modules
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [HealthController], // Global controllers not part of feature modules
})
export class AppModule {}
