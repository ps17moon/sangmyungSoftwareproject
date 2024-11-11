import { Controller, Get, Post, Body, Delete, Param, HttpCode, HttpStatus} from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.schema';

@Controller('/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(@Body() video: Video): Promise<Video> {
    return this.videoService.create(video);
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }
  
  // 날짜로 비디오 조회
  @Post('/findByDate')
  async findByDate(@Body('date') date: string): Promise<Video[]> {
    const parsedDate = new Date(date); // 클라이언트로부터 날짜를 문자열로 받아 Date 객체로 변환
    return this.videoService.findByDate(parsedDate);
  }

  // 비디오 삭제 엔드포인트
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVideo(@Param('id') id: string): Promise<void> {
    await this.videoService.deleteVideoById(id);
  }
}
