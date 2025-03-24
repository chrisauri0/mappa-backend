import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorTemperatura } from './schemas/sensorTemperatura.schema';

@Injectable()
export class SensoresService {
  constructor(
    @InjectModel(SensorTemperatura.name)
    private sensorTemperaturaModel: Model<SensorTemperatura>,
  ) {}

  async createMedicion(sensorId: string, temperature: number, humedad: number) {
    const medicion = new this.sensorTemperaturaModel({
      sensorId,
      temperature,
      humedad,
      timestamp: new Date(),
    });
    return medicion.save();
  }
  async createTiempo(sensorId: string, distancia: number) {
    const medicion = new this.sensorTemperaturaModel({
      sensorId,
      distancia,
      timestamp: new Date(),
    });
    return medicion.save();
  }

  async getMediciones(sensorId: string) {
    return this.sensorTemperaturaModel.find({ sensorId });
  }
}
