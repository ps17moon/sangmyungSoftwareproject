import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  imageURL: string;

  @Prop({ default: Date.now }) // 자동으로 현재 날짜를 저장
  date: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
