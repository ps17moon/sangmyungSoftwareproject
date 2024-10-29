import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from './member.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {}

  // 회원가입 함수
  async register(username: string, password: string, name: string): Promise<Member> {
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
    const newMember = new this.memberModel({ username, password: hashedPassword, name });
    return newMember.save();
  }

  // 로그인 함수
  async login(username: string, password: string): Promise<Member> {
    const member = await this.memberModel.findOne({ username }).exec();
    if (!member) {
      throw new UnauthorizedException('아이디가 존재하지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }

    return member; // 인증 성공 시 사용자 정보 반환
  }
}
