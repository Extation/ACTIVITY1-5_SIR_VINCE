import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const { username, email, password } = registerDto;

    console.log('  → UserService.create - Creating user');
    console.log('    Username:', username);
    console.log('    Email:', email);

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      console.log('    ❌ User already exists');
      throw new ConflictException('Username or email already exists');
    }

    console.log('    ✅ No existing user, proceeding with creation');

    // Hash password
    const saltRounds = 10;
    console.log('    → Hashing password with bcrypt...');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('    ✅ Password hashed, length:', hashedPassword.length);
    console.log('    → Hash sample:', hashedPassword.substring(0, 20) + '...');

    // Create user
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log('    → Saving user to database...');
    const savedUser = await this.userRepository.save(user);
    console.log('    ✅ User saved! ID:', savedUser.id);

    return savedUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    console.log('    → UserService.findByUsername - Searching for:', username);
    
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });
    
    if (user) {
      console.log('    ✅ Found user:', user.username, 'Email:', user.email);
    } else {
      console.log('    ❌ No user found with username or email:', username);
    }
    
    return user;
  }

  async findById(id: number): Promise<User | null> {
    console.log('    → UserService.findById - Searching for ID:', id);
    
    const user = await this.userRepository.findOne({
      where: { id },
    });
    
    if (user) {
      console.log('    ✅ Found user by ID:', user.username);
    } else {
      console.log('    ❌ No user found with ID:', id);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('    → UserService.findByEmail - Searching for:', email);
    
    const user = await this.userRepository.findOne({
      where: { email },
    });
    
    if (user) {
      console.log('    ✅ Found user by email:', user.username);
    } else {
      console.log('    ❌ No user found with email:', email);
    }
    
    return user;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    console.log('    → UserService.validatePassword - Comparing passwords...');
    console.log('    → Plain password length:', plainPassword?.length);
    console.log('    → Hashed password starts with:', hashedPassword?.substring(0, 10));
    
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('    → bcrypt.compare result:', isValid);
    
    return isValid;
  }

  // Password Reset Methods
  generateResetToken(): string {
    // Generate a 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async saveResetToken(email: string, token: string): Promise<void> {
    console.log('    → UserService.saveResetToken - Saving token for:', email);
    
    const user = await this.findByEmail(email);
    
    if (!user) {
      console.log('    ❌ User not found');
      throw new Error('User not found');
    }

    // Token expires in 15 minutes
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);

    user.resetToken = token;
    user.resetTokenExpiry = expiryDate;

    await this.userRepository.save(user);
    
    console.log('    ✅ Reset token saved, expires at:', expiryDate.toISOString());
  }

  async verifyResetToken(email: string, token: string): Promise<boolean> {
    console.log('    → UserService.verifyResetToken - Verifying token for:', email);
    
    const user = await this.findByEmail(email);
    
    if (!user) {
      console.log('    ❌ User not found');
      return false;
    }

    if (!user.resetToken || !user.resetTokenExpiry) {
      console.log('    ❌ No reset token found for user');
      return false;
    }

    // Check if token matches
    if (user.resetToken !== token) {
      console.log('    ❌ Token does not match');
      return false;
    }

    // Check if token has expired
    const now = new Date();
    if (now > user.resetTokenExpiry) {
      console.log('    ❌ Token has expired');
      return false;
    }

    console.log('    ✅ Token is valid');
    return true;
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    console.log('    → UserService.updatePassword - Updating password for:', email);
    
    const user = await this.findByEmail(email);
    
    if (!user) {
      console.log('    ❌ User not found');
      throw new Error('User not found');
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    user.password = hashedPassword;
    
    await this.userRepository.save(user);
    
    console.log('    ✅ Password updated successfully');
  }

  async clearResetToken(email: string): Promise<void> {
    console.log('    → UserService.clearResetToken - Clearing token for:', email);
    
    const user = await this.findByEmail(email);
    
    if (!user) {
      console.log('    ❌ User not found');
      return;
    }

    user.resetToken = null;
    user.resetTokenExpiry = null;

    await this.userRepository.save(user);
    
    console.log('    ✅ Reset token cleared');
  }

  // DEBUG METHOD - Remove in production
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'email', 'password', 'createdAt', 'updatedAt']
    });
  }
}
