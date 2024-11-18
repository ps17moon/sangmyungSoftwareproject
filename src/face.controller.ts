import { Controller, Post, Body } from '@nestjs/common';
import { FaceService } from './face.service';

@Controller('/face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('/create-person-group')
  async createPersonGroup(@Body() body: { personGroupId: string; groupName: string }) {
    await this.faceService.createPersonGroup(body.personGroupId, body.groupName);
  }

  @Post('/add-person')
  async addPersonToGroup(@Body() body: { personGroupId: string; personName: string }) {
    const personId = await this.faceService.addPersonToGroup(body.personGroupId, body.personName);
    return { personId };
  }

  @Post('/add-face')
  async addFaceToPerson(@Body() body: { personGroupId: string; personId: string; imagePath: string }) {
    await this.faceService.addFaceToPerson(body.personGroupId, body.personId, body.imagePath);
  }

  @Post('/identify-face')
  async identifyFace(@Body() body: { personGroupId: string; faceIds: string[] }) {
    const result = await this.faceService.identifyFace(body.personGroupId, body.faceIds);
    return result;
  }
}
