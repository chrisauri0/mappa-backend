import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: LibSQLDatabase<typeof schema>,
  ) {}

  async getPlans() {
    return this.database.select().from(schema.plans);
  }
  async getCardById(cardId: string) {
    // Suponiendo que 'cardId' es el BIN de la tarjeta
    try {
      const response = await fetch(`https://lookup.binlist.net/${cardId}`);
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API de BinList');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Manejo de error, puedes incluir logging o detalles adicionales
      throw new Error('Error al obtener la información: ' + error.message);
    }
  }

  async getPlanById(planId: string): Promise<typeof schema.plans.$inferSelect | null> {
    const plan = await this.database
      .select()
      .from(schema.plans)
      .where(eq(schema.plans.id, Number(planId)));
    return plan.length ? plan[0] : null;
  }

  async createPlan(plan: typeof schema.plans.$inferInsert) {
    return this.database.insert(schema.plans).values(plan);
  }

  async updatePlan(planId: string, updatePlanDto: UpdatePlanDto) {
    await this.database
      .update(schema.plans)
      .set(updatePlanDto)
      .where(eq(schema.plans.id, Number(planId)));
    return this.getPlanById(planId);
  }
}
