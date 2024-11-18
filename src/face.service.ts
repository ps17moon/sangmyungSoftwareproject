import { Injectable } from '@nestjs/common';
import { faceApiClient } from './face.client';

@Injectable()
export class FaceService {
  async createPersonGroup(personGroupId: string, groupName: string): Promise<void> {
    try {
      await faceApiClient.put(`/persongroups/${personGroupId}`, {
        name: groupName,
        recognitionModel: 'recognition_04',
      });
      console.log('PersonGroup 생성 완료');
    } catch (error) {
      console.error('PersonGroup 생성 중 오류:', error.response?.data || error.message);
    }
  }

  async addPersonToGroup(personGroupId: string, personName: string): Promise<string | undefined> {
    try {
      const response = await faceApiClient.post(`/persongroups/${personGroupId}/persons`, {
        name: personName,
      });
      console.log('Person 추가 완료:', response.data);
      return response.data.personId;
    } catch (error) {
      console.error('Person 추가 중 오류:', error.response?.data || error.message);
    }
  }

  async addFaceToPerson(personGroupId: string, personId: string, imagePath: string): Promise<void> {
    const fs = require('fs');
    const FormData = require('form-data');

    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(imagePath));

      await faceApiClient.post(
        `/persongroups/${personGroupId}/persons/${personId}/persistedFaces`,
        form,
        { headers: form.getHeaders() },
      );
      console.log('얼굴 이미지 추가 완료');
    } catch (error) {
      console.error('얼굴 이미지 추가 중 오류:', error.response?.data || error.message);
    }
  }

  async identifyFace(personGroupId: string, faceIds: string[]): Promise<any> {
    try {
      const response = await faceApiClient.post('/identify', {
        personGroupId,
        faceIds,
      });
      console.log('식별 결과:', response.data);
      return response.data;
    } catch (error) {
      console.error('얼굴 식별 중 오류:', error.response?.data || error.message);
    }
  }
}
