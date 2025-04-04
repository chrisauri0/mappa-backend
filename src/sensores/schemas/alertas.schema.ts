import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Alertas extends Document {
  @Prop({ required: true })
  sensor: string;

  @Prop({ required: true })
  valor: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ required: true })
  timestamp: Date;
}
export const AlertasSchema = SchemaFactory.createForClass(Alertas);
