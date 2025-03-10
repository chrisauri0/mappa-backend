import { Controller, Body, Get, Post, Param, Put } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlan } from './dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly planService: PlansService) {}

  @Get()
  async getPlans() {
    return this.planService.getPlans();
  }
  @Get(':planId')
  async getPlanById(@Param('planId') planId: string) {
    return this.planService.getPlanById(planId);
  }
  @Get('/card/:cardId')
  async getCardById(@Param('cardId') cardId: string) {
    return this.planService.getCardById(cardId);
  }

  @Post()
  async createPlan(@Body() request: CreatePlan) {
    return this.planService.createPlan(request);
  }

  @Put(':planId')
  async updatePlan(@Param('planId') planId: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.updatePlan(planId, updatePlanDto);
  }
}
