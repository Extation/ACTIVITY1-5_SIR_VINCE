import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherLog } from './entities/weather-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherLog])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
