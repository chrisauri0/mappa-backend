import { Module } from '@nestjs/common';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorTemperatura, SensorTemperaturaSchema } from './schemas/sensorTemperatura.schema';
import { Rele, ReleSchema } from './schemas/rele.schema';
import { Despertador, DespertadorSchema } from './schemas/despertador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorTemperatura.name, schema: SensorTemperaturaSchema },
      { name: Rele.name, schema: ReleSchema },
      { name: Despertador.name, schema: DespertadorSchema },
    ]),
  ],
  providers: [SensoresService],
  controllers: [SensoresController],
})
export class SensoresModule {}
