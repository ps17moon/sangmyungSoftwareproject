import axios from 'axios';

export const faceApiClient = axios.create({
  baseURL: process.env.AZURE_FACE_ENDPOINT || '',
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.AZURE_FACE_KEY || '',
    'Content-Type': 'application/json',
  },
});
