import { Injectable, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import * as bcrypt from 'bcrypt';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: LibSQLDatabase<typeof schema>,
  ) {}

  async updateUserStatus(userId: number, newStatus: 'active' | 'inactive') {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new error('Usuario no encontrado');
      }

      // Actualizar el status
      await this.database
        .update(schema.users)
        .set({ status: newStatus })
        .where(eq(schema.users.id, userId));

      return { message: 'Estado del usuario actualizado con éxito', userId, newStatus };
    } catch (error) {
      throw new error('Error al actualizar el estado del usuario');
    }
  }

  async getActiveUsers() {
    return this.database.select().from(schema.users);
  }

  async updateUserSuscription(userId: number, newSuscription: string) {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new error('Usuario no encontrado');
      }
      await this.database
        .update(schema.users)
        .set({ subscripcion: newSuscription })
        .where(eq(schema.users.id, userId));
      return { message: 'Suscripción del usuario actualizada con éxito', userId, newSuscription };
    } catch (error) {
      throw new error('Error al actualizar la suscripción del usuario');
    }
  }

  async getUserById(userId: number): Promise<typeof schema.users.$inferSelect | null> {
    const users = await this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));
    return users.length ? users[0] : null;
  }

  async getUsers() {
    return this.database.select().from(schema.users);
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    await this.database.insert(schema.users).values(user);
    return;
  }

  async findByEmail(email: string): Promise<typeof schema.users.$inferSelect | undefined> {
    const users = await this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    return users.length ? users[0] : undefined;
  }
  async login(
    email: string,
    password: string,
  ): Promise<typeof schema.users.$inferSelect | undefined> {
    const user = await this.findByEmail(email);
    if (!user) {
      return undefined;
    }

    if (password !== user.password) {
      return undefined;
    }

    return user;
  }
}
