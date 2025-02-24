import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const plans = sqliteTable('plans', {
  id: integer('id').primaryKey(),
  name_plan: text('name_plan').unique().notNull(),
  description: text('description').notNull(),

  duration: integer('duration').unique().notNull(),
  //checar si sepuede agregar tipo double o decimal en sqlite-core
  price: integer('price').notNull(),

  stripePriceId: text('stripePriceId').notNull(),

  stripeProductId: text('stripeProductId').notNull(),
  status: text('status', { enum: ['available', 'unavailable'] })
    .default('available')
    .notNull(),
});
