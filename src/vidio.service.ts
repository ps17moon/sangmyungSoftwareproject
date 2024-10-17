import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vidio, VidioDocument } from './vidio.schema';
@Injectable()
export class VidioService {
    constructor(@InjectModel(Vidio.name) private vidioModel: Model<VidioDocument>) {}

    async create(vidio: Vidio): Promise<Vidio> {
        const createdVidio = new this.vidioModel(vidio);
        return createdVidio.save();
    }

    async findAll(): Promise<Vidio[]> {
        return this.vidioModel.find().exec();
    }  
}