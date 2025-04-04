import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorTemperatura } from './schemas/sensorTemperatura.schema';
import { Rele } from './schemas/rele.schema';
import { Despertador } from './schemas/despertador.schema';
import { Alertas } from './schemas/alertas.schema';
import { Ritmo } from './schemas/ritmo.achema';
import { Tiempo } from './schemas/tiempo.schema';

@Injectable()
export class SensoresService {
  constructor(
    @InjectModel(SensorTemperatura.name) private sensorTemperaturaModel: Model<SensorTemperatura>,
    @InjectModel(Rele.name) private releModel: Model<Rele>,
    @InjectModel(Alertas.name) private alertasModel: Model<Alertas>, // Cambia 'any' por el tipo correcto de tu esquema de alertas
    @InjectModel(Despertador.name) private despertadorModel: Model<Despertador>,
    @InjectModel(Ritmo.name) private sensorRitmoModel: Model<Ritmo>, // Cambia 'any' por el tipo correcto de tu esquema de ritmo cardiaco
    @InjectModel(Tiempo.name) private tiempoModel: Model<Tiempo>,
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
  async createMedicionCardiaco(sensorId: string, ritmo: number, oxigenacion: number) {
    const medicion = new this.sensorRitmoModel({
      sensorId,
      ritmo,
      oxigenacion,
      timestamp: new Date(),
    });
    return medicion.save();
  }
  async createAlert(sensor: string, valor: number, mensaje: string, timestamp: string) {
    const alert = new this.alertasModel({
      sensor,
      valor,
      mensaje,
      timestamp: new Date(),
    });
    return alert.save();
  }

  async createTiempo(sensorId: string, distancia: number) {
    // Verifica el valor de 'distancia' y asigna 'acostado' en consecuencia
    const acostado = distancia >= 15 ? 'no' : 'si';

    const medicion = new this.tiempoModel({
      sensorId,
      distancia,
      acostado,
      timestamp: new Date(),
    });
    return medicion.save();
  }

  async obtenerPrimerYUltimoRegistroAcostado(sensorId: string) {
    // Obtener la fecha de inicio del día actual (medianoche)
    const inicioDelDia = new Date();
    inicioDelDia.setHours(0, 0, 0, 0);

    // Consultar los registros del sensor del día actual donde 'acostado' sea 'si'
    const registros = await this.tiempoModel
      .find({
        sensorId,
        timestamp: { $gte: inicioDelDia },
        acostado: 'si',
      })
      .sort({ timestamp: 1 });

    // Si no se encontraron registros, se retorna null o se puede manejar de otra forma
    if (!registros.length) {
      return null;
    }

    // Primer registro y último registro de la consulta ordenada
    const primerRegistro = registros[0];
    const ultimoRegistro = registros[registros.length - 1];

    return { primerRegistro, ultimoRegistro };
  }

  async getRitmo(sensorId: string) {
    return this.sensorRitmoModel
      .find({ sensorId })
      .sort({ timestamp: -1 }) // Ordenar por timestamp en orden descendente
      .limit(10); // Limitar el resultado a los últimos 5 registros
  }
  async getAlertas() {
    return this.alertasModel
      .find()
      .sort({ timestamp: -1 }) // Ordenar por timestamp en orden descendente
      .limit(10); // Limitar el resultado a los últimos 5 registros
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
