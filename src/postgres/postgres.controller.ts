import { Controller, Get, Body, Post, Patch } from '@nestjs/common';
import { PostgresService } from './postgres.service';

@Controller('postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) {}

  @Get('users')
  async getUsers() {
    return this.postgresService.getData();
  }
  @Get('/procedure')
  async getProcedure() {
    return this.postgresService.getProcedure();
  }

  @Post('users')
  async createUser(@Body() request: { email: string; password: string; name: string }) {
    return this.postgresService.createUser(request);
  }
}
