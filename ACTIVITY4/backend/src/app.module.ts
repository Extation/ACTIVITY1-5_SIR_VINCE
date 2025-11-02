import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { WeatherModule } from './weather/weather.module';
import { WeatherLog } from './weather/entities/weather-log.entity';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './weather.db',
      entities: [WeatherLog],
      synchronize: true, // Auto-create tables (disable in production)
      logging: false,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Time window in milliseconds (1 minute)
        limit: 20, // Maximum number of requests within the time window
      },
    ]),
    CacheModule,
    WeatherModule,
  ],
})
export class AppModule {}
