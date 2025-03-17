import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),

  codeActivation: text('code_activation').default(sql`(hex(randomblob(16)))`),
  subscripcion: text('subscripcion'),

  status: text('status', { enum: ['active', 'inactive'] })
    .default('inactive')
    .notNull(),

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
