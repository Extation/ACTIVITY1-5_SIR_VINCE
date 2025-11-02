import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'user@example.com', 
    description: 'Email address or username',
    required: true 
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be valid text' })
  username: string; // This field accepts email or username

  @ApiProperty({ 
    example: 'password123', 
    description: 'User password',
    required: true
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be valid text' })
  password: string;
}
