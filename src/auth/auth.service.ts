import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async signupLocal(dto: AuthDto) {
  //   const hashedPassword = await bcrypt.hash(dto.password, 10);
  //   const user = await this.usersService.create({
  //     ...dto,
  //     password: hashedPassword,
  //   });
  //   return this.signUser(user.id?.toString() || '', user.email);
  // }

  async signinLocal(dto: AuthDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new Error('Invalid credentials');
    }
    console.log('Password matches');

    const token = this.signUser(user.id?.toString(), user.email);
    const userWithToken = { ...user, token };
    console.log('Generated token:', token);

    return userWithToken;
  }

  async logout() {
    // Implementar lógica de cierre de sesión si es necesario
  }

  async refreshTokens() {
    // Implementar lógica de refresco de tokens si es necesario
  }

  private signUser(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
