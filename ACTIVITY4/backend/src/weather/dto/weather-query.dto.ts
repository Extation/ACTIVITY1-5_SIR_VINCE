import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherQueryDto {
  @ApiProperty({
    description: 'City name to fetch weather for',
    example: 'London',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
}

export class WeatherResponseDto {
  @ApiProperty({ description: 'City name' })
  city: string;

  @ApiProperty({ description: 'Temperature in Celsius' })
  temperature: number;

  @ApiProperty({ description: 'Weather condition' })
  condition: string;

  @ApiProperty({ description: 'Weather description' })
  description: string;

  @ApiProperty({ description: 'Humidity percentage' })
  humidity: number;

  @ApiProperty({ description: 'Wind speed in m/s' })
  windSpeed: number;

  @ApiProperty({ description: 'Country code' })
  country: string;

  @ApiProperty({ description: 'Timestamp' })
  timestamp: Date;
}
