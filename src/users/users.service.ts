import { Injectable, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = { ...user, password: hashedPassword };
    await this.database.insert(schema.users).values(userWithHashedPassword);
    return userWithHashedPassword;
  }

  async create(user: typeof schema.users.$inferInsert) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = { ...user, password: hashedPassword };
    await this.database.insert(schema.users).values(userWithHashedPassword);
    return userWithHashedPassword;
  }

  async findByEmail(email: string): Promise<typeof schema.users.$inferSelect | undefined> {
    const users = await this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    return users.length ? users[0] : undefined;
  }
  // async getByEmail(email: string): Promise<typeof schema.users.$inferSelect | undefined> {
  //   const users = await this.database
  //     .select()
  //     .from(schema.users)
  //     .where(eq(schema.users.email, email));
  //   return users.map((user) => user)[0];
  // }
}
