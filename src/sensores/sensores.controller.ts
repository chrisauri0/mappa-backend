import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SensoresService } from './sensores.service';

@Controller('sensores')
export class SensoresController {
  constructor(private readonly sensoresService: SensoresService) {}

  @Post('temperatura')
  async createSensorTemperatura(
    @Body() body: { sensorId: string; temperature: number; humedad: number },
  ) {
    return this.sensoresService.createMedicion(body.sensorId, body.temperature, body.humedad);
  }

  @Get('temperatura/:sensorId')
  async getSensorTemperatura(@Param('sensorId') sensorId: string) {
    return this.sensoresService.getMediciones(sensorId);
  }
}
