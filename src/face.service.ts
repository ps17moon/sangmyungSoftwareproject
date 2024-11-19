import { Injectable } from '@nestjs/common';
import { faceApiClient } from './face.client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FaceService {
  private readonly unrecognizedFolder = path.resolve('unrecognized');
  private readonly recognizedFolder = path.resolve('recognized');

  constructor() {
    // Ensure directories exist
    if (!fs.existsSync(this.unrecognizedFolder)) fs.mkdirSync(this.unrecognizedFolder);
    if (!fs.existsSync(this.recognizedFolder)) fs.mkdirSync(this.recognizedFolder);
  }

  async processCapturedImages(personGroupId: string): Promise<void> {
    const imagesFolder = path.resolve('captured_images');
    const imageFiles = fs.readdirSync(imagesFolder);

    for (const imageFile of imageFiles) {
      const imagePath = path.join(imagesFolder, imageFile);

      try {
        // Detect face in image
        const detectResponse = await faceApiClient.post('/detect', {
          url: `file://${imagePath}`,
        });
        const faceId = detectResponse.data[0]?.faceId;

        if (!faceId) {
          console.log(`No face detected in ${imageFile}`);
          continue;
        }

        // Identify face
        const identifyResponse = await faceApiClient.post('/identify', {
          personGroupId,
          faceIds: [faceId],
        });

        const candidates = identifyResponse.data[0]?.candidates || [];
        if (candidates.length > 0) {
          // Recognized person
          const personId = candidates[0].personId;
          const personFolder = path.join(this.recognizedFolder, personId);

          if (!fs.existsSync(personFolder)) fs.mkdirSync(personFolder);

          fs.renameSync(imagePath, path.join(personFolder, imageFile));
          console.log(`Moved ${imageFile} to recognized folder for person ${personId}`);
        } else {
          // Unrecognized person
          fs.renameSync(imagePath, path.join(this.unrecognizedFolder, imageFile));
          console.log(`Moved ${imageFile} to unrecognized folder`);
        }
      } catch (error) {
        console.error(`Error processing ${imageFile}:`, error.message);
      }
    }
  }

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
