import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { AuthModule } from './auth/auth.module';
import { UserPlanModule } from './user-plan/user-plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    PlansModule,
    AuthModule,
    UserPlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
