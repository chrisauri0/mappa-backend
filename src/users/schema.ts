import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').default(''),
  hash: text('hash'),
  hashedRt: text('hashedRt'),
  role: text('role', { enum: ['cliente', 'admin'] })
    .default('cliente')
    .notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
