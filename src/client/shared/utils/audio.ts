import axios from 'axios';
import { call } from 'redux-saga/effects';

interface Fields {
  [key: string]: any;
}

export function sendAudio(url: string, audio: any, fields: Fields) {
  const formData = new FormData();
  const file = new File([audio], `${Date.now()}.webM`);
  const boundary = (formData as any)._boundary;

  formData.append('audio', file);
  Object.keys(fields).forEach(key => {
    formData.append(key, fields[key]);
  });

  return call(axios.post, url, formData, {
    headers: {
      'Content-type': `multipart/form-data boundary=${boundary}`
    }
  });
}
