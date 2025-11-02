import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: any) {
    // Fetch the latest user data from database to ensure role is current
    const user = await this.authService.validateUser(payload);
    
    if (!user) {
      return null;
    }
    
    // Return user object with all necessary fields including role
    return { 
      userId: payload.sub, 
      email: payload.email, 
      username: payload.username,
      role: user.role // Include role from database
    };
  }
}
