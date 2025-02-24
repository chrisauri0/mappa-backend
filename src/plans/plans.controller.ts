import { Controller, Body, Get, Post } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlan } from './dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly planService: PlansService) {}

  @Get()
  async getPlans() {
    return this.planService.getPlans();
  }
  @Post()
  async createPlan(@Body() request: CreatePlan) {
    return this.planService.createPlnas(request);
  }
}
