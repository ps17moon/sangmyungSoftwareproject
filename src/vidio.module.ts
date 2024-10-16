import { Module } from '@nestjs/common';
import { VidioController } from './vidio.controller';
import { VidioService } from './vidio.service';

@Module({
  imports: [],
  controllers: [VidioController],
  providers: [VidioService],
})
export class VidioModule {}