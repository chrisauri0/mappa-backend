import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { UserPlanService } from './user-plan.service';
import { CreateUserPlan, UpdateUserPlan } from './dto';
import { get } from 'http';
import { getRandomValues } from 'crypto';
import * as schema from './schema';

@Controller('user-plans')
export class UserPlanController {
  constructor(private readonly userPlanService: UserPlanService) {}

  @Post()
  async createUserPlan(@Body() Uplan: typeof schema.userPlans.$inferInsert) {
    return this.userPlanService.createUserPlan(Uplan);
  }
  @Get('/total-ventas')
  async getTotalVentas() {
    return this.userPlanService.getTotalVentas();
  }

  @Get()
  async getUsersPlans() {
    return this.userPlanService.getUsersPlans();
  }

  @Get(':userId')
  async getUserPlans(@Param('userId') userId: number) {
    return this.userPlanService.getUserPlans(userId);
  }

  @Delete(':userPlanId')
  async deleteUserPlan(@Param('userPlanId') userPlanId: number) {
    return this.userPlanService.deleteUserPlan(userPlanId);
  }
}
