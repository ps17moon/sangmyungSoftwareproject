import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VidioModule } from './vidio.module';

@Module({
  imports: [VidioModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
