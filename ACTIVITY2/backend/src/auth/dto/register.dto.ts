import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'john_doe', 
    description: 'Username (3-20 characters, alphanumeric and underscores only)',
    required: true,
    minLength: 3,
    maxLength: 20
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be valid text' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' })
  username: string;

  @ApiProperty({ 
    example: 'john@example.com', 
    description: 'Valid email address',
    required: true
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Password (minimum 6 characters)',
    required: true,
    minLength: 6
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be valid text' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
