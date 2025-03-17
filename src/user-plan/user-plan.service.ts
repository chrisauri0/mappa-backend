import { Injectable, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class UserPlanService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: LibSQLDatabase<typeof schema>,
  ) {}

  async createUserPlan(userPlan: typeof schema.userPlans.$inferInsert) {
    return this.database.insert(schema.userPlans).values(userPlan);
  }

  async getUsersPlans() {
    return this.database.select().from(schema.userPlans);
  }

  async getUserPlans(userId: number) {
    return this.database
      .select()
      .from(schema.userPlans)
      .where(eq(schema.userPlans.userId, Number(userId)));
  }
  async updateUserPlan(userPlanId: number, userPlan: typeof schema.userPlans.$inferInsert) {
    await this.database
      .update(schema.userPlans)
      .set(userPlan)
      .where(eq(schema.userPlans.id, Number(userPlanId)));
  }

  async deleteUserPlan(userPlanId: number) {
    await this.database.delete(schema.userPlans).where(eq(schema.userPlans.id, Number(userPlanId)));
  }
}
