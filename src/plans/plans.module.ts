import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { DatabaseModule } from 'src/database/database.module';
import { StripeService } from "../stripe/stripe.service";

@Module({
  imports: [DatabaseModule],
  controllers: [PlansController],
  providers: [PlansService,StripeService],
})
export class PlansModule {}
