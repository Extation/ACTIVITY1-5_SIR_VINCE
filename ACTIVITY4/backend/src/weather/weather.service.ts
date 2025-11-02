import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { WeatherLog } from './entities/weather-log.entity';
import { WeatherResponseDto } from './dto/weather-query.dto';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class WeatherService {
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes
  private readonly API_TIMEOUT = 5000; // 5 seconds

  constructor(
    @InjectRepository(WeatherLog)
    private weatherLogRepository: Repository<WeatherLog>,
    private cacheService: CacheService,
  ) {}

  async getWeather(city: string): Promise<WeatherResponseDto> {
    try {
      // Normalize city name for cache key
      const cacheKey = `weather:${city.toLowerCase().trim()}`;

      // Check cache first
      const cachedData = this.cacheService.get<WeatherResponseDto>(cacheKey);
      if (cachedData) {
        console.log(`Cache hit for city: ${city}`);
        
        // Save to database even for cached data (to track search history)
        // Use fresh timestamp for each search
        const weatherDataWithNewTimestamp = {
          ...cachedData,
          timestamp: new Date(),
        };
        
        // Save to database asynchronously
        this.saveToDatabase(weatherDataWithNewTimestamp).catch((err) => {
          console.error('Failed to save cached data to database:', err);
        });
        
        return weatherDataWithNewTimestamp;
      }

      console.log(`Cache miss for city: ${city}, fetching from API`);

      const apiKey = process.env.OPENWEATHER_API_KEY;
      const apiUrl = process.env.OPENWEATHER_API_URL;

      if (!apiKey || apiKey === 'your_api_key_here') {
        throw new HttpException(
          'OpenWeatherMap API key is not configured. Please set OPENWEATHER_API_KEY in .env file',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Call OpenWeatherMap API with timeout
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', // Get temperature in Celsius
        },
        timeout: this.API_TIMEOUT,
      });

      const data = response.data;

      // Extract weather information
      const weatherData: WeatherResponseDto = {
        city: data.name,
        temperature: Math.round(data.main.temp * 10) / 10,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        country: data.sys.country,
        timestamp: new Date(),
      };

      // Cache the result
      this.cacheService.set(cacheKey, weatherData, this.CACHE_TTL);

      // Save to database asynchronously (don't wait for it)
      this.saveToDatabase(weatherData).catch((err) => {
        console.error('Failed to save to database:', err);
      });

      return weatherData;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `City "${city}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.response?.status === 401) {
        throw new HttpException(
          'Invalid API key',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (error.code === 'ECONNABORTED') {
        throw new HttpException(
          'Request timeout - weather service is taking too long to respond',
          HttpStatus.REQUEST_TIMEOUT,
        );
      }

      throw new HttpException(
        error.message || 'Failed to fetch weather data',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async saveToDatabase(weatherData: WeatherResponseDto): Promise<void> {
    const weatherLog = this.weatherLogRepository.create({
      city: weatherData.city,
      temperature: weatherData.temperature,
      condition: weatherData.condition,
      description: weatherData.description,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    });

    await this.weatherLogRepository.save(weatherLog);
  }

  async getWeatherHistory(): Promise<WeatherLog[]> {
    // Optimize query by selecting only needed fields and using index
    return this.weatherLogRepository.find({
      select: ['id', 'city', 'temperature', 'condition', 'description', 'humidity', 'windSpeed', 'timestamp'],
      order: {
        timestamp: 'DESC',
      },
      take: 50, // Limit to last 50 records
    });
  }

  async clearHistory(): Promise<{ message: string; deletedCount: number }> {
    // Optimize by using count query instead of fetching all records
    const count = await this.weatherLogRepository.count();
    
    if (count > 0) {
      await this.weatherLogRepository.clear();
    }
    
    return {
      message: 'Weather history cleared successfully',
      deletedCount: count,
    };
  }
}
