import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { AuthModule } from './auth/auth.module';
import { StripeService } from './stripe/stripe.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    PlansModule,
    AuthModule,
  ],
  controllers: [],
  providers: [StripeService],
})
export class AppModule {}
