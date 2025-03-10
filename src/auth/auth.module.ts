import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from './jwt.config';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule, PassportModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
