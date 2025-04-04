import { Module } from '@nestjs/common';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorTemperatura, SensorTemperaturaSchema } from './schemas/sensorTemperatura.schema';
import { Rele, ReleSchema } from './schemas/rele.schema';
import { Despertador, DespertadorSchema } from './schemas/despertador.schema';
import { Alertas, AlertasSchema } from './schemas/alertas.schema';
import { Ritmo, RitmoSchema } from './schemas/ritmo.achema';
import { Tiempo, TiempoSchema } from './schemas/tiempo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorTemperatura.name, schema: SensorTemperaturaSchema },
      { name: Rele.name, schema: ReleSchema },
      { name: Despertador.name, schema: DespertadorSchema },
      { name: Alertas.name, schema: AlertasSchema },
      { name: Ritmo.name, schema: RitmoSchema },
      { name: Tiempo.name, schema: TiempoSchema },
    ]),
  ],
  providers: [SensoresService],
  controllers: [SensoresController],
})
export class SensoresModule {}
