import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rele extends Document {
  @Prop({ required: true })
  sensorId: string;

  @Prop({ required: true })
  estado: string;

  @Prop({ required: true })
  timestamp: Date;
}
export const ReleSchema = SchemaFactory.createForClass(Rele);
