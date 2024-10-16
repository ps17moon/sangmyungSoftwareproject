import { Controller, Get } from '@nestjs/common';
import { VidioService } from './vidio.service';

@Controller('/vidio')
export class VidioController {
  constructor(private readonly vidioService: VidioService) {}

  @Get('/main')
  async getMainPage() {
    return this.vidioService.getMainPage();
  }
}