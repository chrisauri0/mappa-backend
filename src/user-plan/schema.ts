import { time } from 'console';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { start } from 'repl';

export const userPlans = sqliteTable('user_plans', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  userName: text('user_name'),
  planId: integer('plan_id').notNull(),
  planName: text('plan_name'),
  planPrice: integer('plan_price').notNull(),
  startDate: text('start_date')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  compras: integer('compras').default(1).notNull(),
});
