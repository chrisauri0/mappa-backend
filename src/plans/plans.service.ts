import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import {StripeService } from '../stripe/stripe.service'
import * as schema from './schema';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class PlansService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databe: LibSQLDatabase<typeof schema>,
    private readonly stripeService: StripeService,
  ) {}
  async getPlans() {
    return this.databe.select().from(schema.plans);
  }
  async createPlnas(plan: typeof schema.plans.$inferInsert) {
    const { name_plan, description, price } = plan;

   
    const stripeProduct = await this.stripeService.createProduct(name_plan, description);

    
    const stripePrice = await this.stripeService.createPrice(stripeProduct.id, price);

    
    plan.stripeProductId = stripeProduct.id;
    plan.stripePriceId = stripePrice.id;

    // 4️⃣ Insertar el plan en la base de datos
    return this.databe.insert(schema.plans).values(plan);
  }
}
