import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('weather_logs')
@Index(['city']) // Index for faster city lookups
@Index(['timestamp']) // Index for faster timestamp-based queries
@Index(['city', 'timestamp']) // Composite index for combined queries
export class WeatherLog {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'City name' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Temperature in Celsius' })
  @Column('float')
  temperature: number;

  @ApiProperty({ description: 'Weather condition' })
  @Column()
  condition: string;

  @ApiProperty({ description: 'Weather description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Humidity percentage' })
  @Column({ nullable: true })
  humidity: number;

  @ApiProperty({ description: 'Wind speed' })
  @Column('float', { nullable: true })
  windSpeed: number;

  @ApiProperty({ description: 'Timestamp of the log' })
  @CreateDateColumn()
  timestamp: Date;
}
