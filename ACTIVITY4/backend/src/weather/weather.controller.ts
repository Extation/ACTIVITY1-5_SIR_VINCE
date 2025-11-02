import { Controller, Get, Query, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { WeatherService } from './weather.service';
import { WeatherQueryDto, WeatherResponseDto } from './dto/weather-query.dto';
import { WeatherLog } from './entities/weather-log.entity';

@ApiTags('weather')
@Controller('api/weather')
@UseGuards(ThrottlerGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get weather for a city' })
  @ApiQuery({
    name: 'city',
    required: true,
    description: 'City name to fetch weather for',
    example: 'London',
  })
  @ApiResponse({
    status: 200,
    description: 'Weather data retrieved successfully',
    type: WeatherResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'City not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getWeather(@Query() query: WeatherQueryDto): Promise<WeatherResponseDto> {
    return this.weatherService.getWeather(query.city);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get weather search history' })
  @ApiResponse({
    status: 200,
    description: 'Weather history retrieved successfully',
    type: [WeatherLog],
  })
  async getWeatherHistory(): Promise<WeatherLog[]> {
    return this.weatherService.getWeatherHistory();
  }

  @Delete('history')
  @ApiOperation({ summary: 'Clear weather search history' })
  @ApiResponse({
    status: 200,
    description: 'Weather history cleared successfully',
  })
  async clearHistory(): Promise<{ message: string; deletedCount: number }> {
    return this.weatherService.clearHistory();
  }
}
