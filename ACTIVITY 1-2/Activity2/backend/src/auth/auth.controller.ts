import { Controller, Post, Body, HttpCode, HttpStatus, Get, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('debug/users')
  @ApiOperation({ summary: 'DEBUG: List all users in database' })
  async debugListUsers() {
    return this.authService.debugListAllUsers();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    console.log('\n=== REGISTRATION ATTEMPT ===');
    console.log('Received data:', JSON.stringify(registerDto, null, 2));
    console.log('Username:', registerDto.username, '| Type:', typeof registerDto.username);
    console.log('Email:', registerDto.email, '| Type:', typeof registerDto.email);
    console.log('Password length:', registerDto.password?.length);
    
    const result = await this.authService.register(registerDto);
    console.log('✅ Registration successful for user:', result.user.username);
    console.log('User ID:', result.user.id);
    console.log('=========================\n');
    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: any) {
    console.log('\n=== LOGIN ATTEMPT ===');
    console.log('🔍 RAW BODY:', loginDto);
    console.log('🔍 OBJECT KEYS:', Object.keys(loginDto || {}));
    
    // Accept both 'username' and 'email' field names
    const username = loginDto?.username || loginDto?.email;
    const password = loginDto?.password;
    
    console.log('🔍 Username/Email:', username);
    console.log('🔍 Password:', password ? '***' + password.substring(password.length - 3) : 'EMPTY');
    
    if (!username || !password) {
      console.log('❌ Missing username/email or password');
      console.log('  Username/Email value:', username);
      console.log('  Password value:', password ? 'EXISTS' : 'MISSING');
      throw new BadRequestException('Email and password are required');
    }
    
    // Create proper login DTO with 'username' field (backend expects this)
    const properLoginDto = { username, password };
    
    console.log('🔵 Calling authService.login()...');
    
    try {
      const result = await this.authService.login(properLoginDto as any);
      console.log('✅ Login successful for user:', result.user.username);
      console.log('===================\n');
      return result;
    } catch (error) {
      console.log('❌ Login failed:', error.message);
      console.log('===================\n');
      throw error;
    }
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset code' })
  @ApiResponse({ status: 200, description: 'Reset code sent to email' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.requestPasswordReset(forgotPasswordDto);
  }

  @Post('verify-reset-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify password reset code' })
  @ApiResponse({ status: 200, description: 'Code verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  async verifyResetCode(@Body() verifyResetCodeDto: VerifyResetCodeDto) {
    return this.authService.verifyResetCode(verifyResetCodeDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with verified code' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
