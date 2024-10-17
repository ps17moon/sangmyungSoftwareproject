import { Controller, Get, Post, Body } from '@nestjs/common';
import { VidioService } from './vidio.service';
import { Vidio } from './vidio.schema';

@Controller('/vidio')
export class VidioController {
  constructor(private readonly vidioService: VidioService) {}

  @Post()
  async create(@Body() vidio: Vidio): Promise<Vidio> {
    return this.vidioService.create(vidio);
  }

  @Get()
  async findAll(): Promise<Vidio[]> {
    return this.vidioService.findAll();
  }
  
}
