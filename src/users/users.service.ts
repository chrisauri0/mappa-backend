import { Injectable, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import * as schema from './schema';
import { DATABASE_CONNECTION } from 'src/database/database.module';
@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: LibSQLDatabase<typeof schema>,
  ) {}
  async getUsers() {
    return this.database.select().from(schema.users);
  }
  async createUser(user: typeof schema.users.$inferInsert) {
    await this.database.insert(schema.users).values(user);
  }
}
