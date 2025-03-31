import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorTemperatura } from './schemas/sensorTemperatura.schema';
import { Rele } from './schemas/rele.schema';
import { Despertador } from './schemas/despertador.schema';

@Injectable()
export class SensoresService {
  constructor(
    @InjectModel(SensorTemperatura.name) private sensorTemperaturaModel: Model<SensorTemperatura>,
    @InjectModel(Rele.name) private releModel: Model<Rele>,
    @InjectModel(Despertador.name) private despertadorModel: Model<Despertador>,
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
    return this.sensorTemperaturaModel
      .find({ sensorId })
      .sort({ timestamp: -1 }) // Ordenar por timestamp en orden descendente
      .limit(10); // Limitar el resultado a los últimos 5 registros
  }
  async toggleRele(sensorId: string, estado: 'on' | 'off') {
    const rele = new this.releModel({
      sensorId,
      estado,
      timestamp: new Date(),
    });
    return rele.save();
  }
  async getRele() {
    return this.releModel.findOne({ sensorId: 'sensor123' }).sort({ timestamp: -1 });
  }
  async toggleDespertador(sensorId: string, estado: 'on' | 'off') {
    const rele = new this.despertadorModel({
      sensorId,
      estado,
      timestamp: new Date(),
    });
    return rele.save();
  }
  async getDespertador() {
    const despertador = await this.despertadorModel
      .findOne({ sensorId: 'alarma' })
      .sort({ timestamp: -1 });

    if (!despertador) {
      return { mensaje: 'No hay datos disponibles para el despertador' };
    }

    return despertador;
  }
}
