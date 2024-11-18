import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose'
import { MemberModule } from './member.module';
import { FaceModule } from './face.module';

@Module({
  imports: [FaceModule, ConfigModule, VideoModule, MemberModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule{}
