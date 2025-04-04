import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tiempo extends Document {
  @Prop({ required: true })
  sensorId: string;

  @Prop({ required: true })
  distancia: number;

  @Prop({ required: true })
  acostado: string;

  @Prop({ required: true })
  timestamp: Date;
}
export const TiempoSchema = SchemaFactory.createForClass(Tiempo);
