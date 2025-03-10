import { time } from 'console';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userPlans = sqliteTable('user_plans', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  userName: text('user_name'),
  planId: integer('plan_id').notNull(),
  planName: text('plan_name'),
  startDate: text('start_date').default(sql`CURRENT_TIMESTAMP`),
  endDate: text('end_date').notNull(),
  status: text('status', { enum: ['active', 'inactive'] })
    .default('active')
    .notNull(),
  compras: integer('compras').notNull(),
});
