import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PracticeDocument = Practice & Document;

@Schema({ timestamps: true })
export class Practice {
  @Prop({ required: true })
  nomeUsuario: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  data: Date;

  @Prop()
  descricao?: string;
}

export const PracticeSchema = SchemaFactory.createForClass(Practice);
