import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VidioDocument = Vidio & Document;

@Schema()
export class Vidio {
  @Prop()
  imageURL: string;
}

export const VidioSchema = SchemaFactory.createForClass(Vidio);