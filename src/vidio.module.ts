import { Module } from '@nestjs/common';
import { VidioController } from './vidio.controller';
import { VidioService } from './vidio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vidio, VidioSchema } from './vidio.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vidio.name, schema: VidioSchema }])],
  controllers: [VidioController],
  providers: [VidioService],
})
export class VidioModule {}