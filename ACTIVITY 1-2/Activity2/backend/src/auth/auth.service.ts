import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from '../user/user.entity';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; access_token: string }> {
    console.log('AuthService.register - Starting registration');
    console.log('  → Username:', registerDto.username);
    console.log('  → Email:', registerDto.email);
    console.log('  → Password length:', registerDto.password?.length);
    
    const user = await this.userService.create(registerDto);
    
    console.log('✅ User created in database!');
    console.log('  → User ID:', user.id);
    console.log('  → Username:', user.username);
    console.log('  → Email:', user.email);
    console.log('  → Password hash length:', user.password?.length);
    console.log('  → Password hash sample:', user.password?.substring(0, 20) + '...');
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    console.log('✅ Registration complete, token generated');
    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>; access_token: string }> {
    console.log('AuthService.login - Validating user:', loginDto.username);
    
    const user = await this.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      console.log('❌ Validation failed - Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('✅ User validated:', user.username, '(ID:', user.id, ')');

    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    console.log('✅ Token generated successfully');
    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    console.log('  → validateUser - Looking up:', username);
    
    const user = await this.userService.findByUsername(username);
    
    if (!user) {
      console.log('  ❌ User NOT found in database');
      return null;
    }
    
    console.log('  ✅ User found:', user.username, 'Email:', user.email, 'ID:', user.id);
    console.log('  → Checking password...');
    
    const isPasswordValid = await this.userService.validatePassword(password, user.password);
    console.log('  → Password valid?', isPasswordValid);
    
    if (isPasswordValid) {
      console.log('  ✅ Password matches!');
      return user;
    }
    
    console.log('  ❌ Password does NOT match');
    return null;
  }

  // Password Reset Methods
  async requestPasswordReset(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    console.log('\n=== PASSWORD RESET REQUEST ===');
    console.log('Email:', forgotPasswordDto.email);

    const user = await this.userService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      console.log('❌ User not found');
      // For security, don't reveal if email exists or not
      throw new NotFoundException('If this email exists, a reset code has been sent.');
    }

    console.log('✅ User found:', user.username);

    // Generate reset token
    const resetToken = this.userService.generateResetToken();
    console.log('🔑 Generated reset token:', resetToken);

    // Save token to database
    await this.userService.saveResetToken(forgotPasswordDto.email, resetToken);

    // Send email (simulated)
    await this.emailService.sendPasswordResetEmail(forgotPasswordDto.email, resetToken);

    console.log('✅ Password reset email sent');
    console.log('==============================\n');

    return {
      message: 'If this email exists, a reset code has been sent. Please check your email.',
    };
  }

  async verifyResetCode(verifyResetCodeDto: VerifyResetCodeDto): Promise<{ message: string; valid: boolean }> {
    console.log('\n=== VERIFY RESET CODE ===');
    console.log('Email:', verifyResetCodeDto.email);
    console.log('Code:', verifyResetCodeDto.code);

    const isValid = await this.userService.verifyResetToken(
      verifyResetCodeDto.email,
      verifyResetCodeDto.code,
    );

    if (!isValid) {
      console.log('❌ Invalid or expired code');
      console.log('=========================\n');
      throw new BadRequestException('Invalid or expired reset code.');
    }

    console.log('✅ Code is valid');
    console.log('=========================\n');

    return {
      message: 'Reset code verified successfully.',
      valid: true,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    console.log('\n=== RESET PASSWORD ===');
    console.log('Email:', resetPasswordDto.email);
    console.log('Code:', resetPasswordDto.code);

    // Verify the code first
    const isValid = await this.userService.verifyResetToken(
      resetPasswordDto.email,
      resetPasswordDto.code,
    );

    if (!isValid) {
      console.log('❌ Invalid or expired code');
      console.log('======================\n');
      throw new BadRequestException('Invalid or expired reset code.');
    }

    console.log('✅ Code verified, updating password...');

    // Update password
    await this.userService.updatePassword(resetPasswordDto.email, resetPasswordDto.newPassword);

    // Clear reset token
    await this.userService.clearResetToken(resetPasswordDto.email);

    console.log('✅ Password reset successful');
    console.log('======================\n');

    return {
      message: 'Password has been reset successfully. You can now login with your new password.',
    };
  }

  // DEBUG METHOD - Remove in production
  async debugListAllUsers() {
    console.log('🔍 DEBUG: Listing all users in database');
    const users = await this.userService.findAll();
    console.log('Found', users.length, 'users');
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      passwordHashSample: user.password?.substring(0, 20) + '...',
      createdAt: user.createdAt
    }));
  }
}
