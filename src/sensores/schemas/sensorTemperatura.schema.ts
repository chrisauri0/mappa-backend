import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SensorTemperatura extends Document {
  @Prop({ required: true })
  sensorId: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humedad: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const SensorTemperaturaSchema = SchemaFactory.createForClass(SensorTemperatura);
