import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
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

  @Post('alertas')
  async createAlert(
    @Body()
    body: {
      sensor: string;
      valor: number;
      mensaje: string;
      timestamp: string;
    },
  ) {
    return this.sensoresService.createAlert(body.sensor, body.valor, body.mensaje, body.timestamp);
  }
  @Get('alertas')
  async getAlertas() {
    return this.sensoresService.getAlertas();
  }
  @Post('cardiaco')
  async createSensorCardiaco(
    @Body() body: { sensorId: string; ritmo: number; oxigenacion: number },
  ) {
    return this.sensoresService.createMedicionCardiaco(body.sensorId, body.ritmo, body.oxigenacion);
  }
  @Get('cardiaco/:sensorId')
  async getSensorCardiaco(@Param('sensorId') sensorId: string) {
    return this.sensoresService.getRitmo(sensorId);
  }

  @Post('tiempoCama')
  async createSensorTiempo(@Body() body: { sensorId: string; distancia: number }) {
    return this.sensoresService.createTiempo(body.sensorId, body.distancia);
  }
  @Get('tiempoCama/:sensorId')
  async getSensorTiempo(@Param('sensorId') sensorId: string) {
    return this.sensoresService.obtenerPrimerYUltimoRegistroAcostado(sensorId);
  }

  @Get('temperatura/:sensorId')
  async getSensorTemperatura(@Param('sensorId') sensorId: string) {
    return this.sensoresService.getMediciones(sensorId);
  }
  @Patch('rele/:sensorId')
  async toggleRele(@Param('sensorId') sensorId: string, @Body() body: { estado: 'on' | 'off' }) {
    if (!['on', 'off'].includes(body.estado)) {
      throw new Error('Estado inválido. Debe ser "on" o "off".');
    }
    return this.sensoresService.toggleRele(sensorId, body.estado);
  }
  @Get('rele')
  async getRele() {
    return this.sensoresService.getRele();
  }
  @Patch('despertador/:sensorId')
  async toggleDespertador(
    @Param('sensorId') sensorId: string,
    @Body() body: { estado: 'on' | 'off' },
  ) {
    if (!['on', 'off'].includes(body.estado)) {
      throw new Error('Estado inválido. Debe ser "on" o "off".');
    }
    return this.sensoresService.toggleDespertador(sensorId, body.estado);
  }
  @Get('despertador')
  async getDespertador() {
    return this.sensoresService.getDespertador();
  }
}
