import { Injectable } from '@nestjs/common';

@Injectable()
export class VidioService {
    async getMainPage() {
        return 'User Main Page';
    }  
}