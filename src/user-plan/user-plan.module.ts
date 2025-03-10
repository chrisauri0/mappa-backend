import { Module } from '@nestjs/common';
import { UserPlanController } from './user-plan.controller';
import { UserPlanService } from './user-plan.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserPlanController],
  providers: [UserPlanService],
})
export class UserPlanModule {}
