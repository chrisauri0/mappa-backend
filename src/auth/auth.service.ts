import { Injectable, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './auth.module';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: LibSQLDatabase<typeof schema>,
  ) {}

  signupLocal(dto: AuthDto) {
    const newUser = this.database.insert(schema.users).values({
      data: {
        email: dto.email,
        password: dto.password,
      },
    });
  }

  signinLocal() {}

  logout() {}

  refreshTokens() {}
}
