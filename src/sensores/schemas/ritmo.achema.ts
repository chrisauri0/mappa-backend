import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ritmo extends Document {
  @Prop({ required: true })
  sensorId: string;

  @Prop({ required: true })
  ritmo: string;

  @Prop({ required: true })
  oxigenacion: string;

  @Prop({ required: true })
  timestamp: Date;
}
export const RitmoSchema = SchemaFactory.createForClass(Ritmo);
