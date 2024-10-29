import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './member.schema';

@Controller('/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 회원가입 엔드포인트
  @Post('/register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string
  ): Promise<Member> {
    try {
      return await this.memberService.register(username, password, name);
    } catch (error) {
      throw new BadRequestException('회원가입에 실패했습니다.');
    }
  }

  // 로그인 엔드포인트
  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<Member | { message: string }> {
    try {
      return await this.memberService.login(username, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
