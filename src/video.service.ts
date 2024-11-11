import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async create(video: Video): Promise<Video> {
    const createdVideo = new this.videoModel(video);
    return createdVideo.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  // 날짜로 비디오 조회
  async findByDate(date: Date): Promise<Video[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    return this.videoModel.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    }).exec();
  }

  // 비디오 삭제 메서드
  async deleteVideoById(id: string): Promise<void> {
    const result = await this.videoModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Video with ID ${id} not found.`);
    }
  }
}
