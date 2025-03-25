import { Module } from '@nestjs/common';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorTemperatura, SensorTemperaturaSchema } from './schemas/sensorTemperatura.schema';
import { Rele, ReleSchema } from './schemas/rele.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorTemperatura.name, schema: SensorTemperaturaSchema },
      { name: Rele.name, schema: ReleSchema },
    ]),
  ],
  providers: [SensoresService],
  controllers: [SensoresController],
})
export class SensoresModule {}
