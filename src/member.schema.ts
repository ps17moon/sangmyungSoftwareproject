import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop({ required: true, unique: true })
  username: string; // 사용자 아이디

  @Prop({ required: true })
  password: string; // 비밀번호 (해싱 후 저장)

  @Prop({ required: true })
  name: string; // 사용자 이름
}

export const MemberSchema = SchemaFactory.createForClass(Member);
