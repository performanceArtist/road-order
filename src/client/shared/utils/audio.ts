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
    const value =
      fields[key] instanceof Array ? JSON.stringify(fields[key]) : fields[key];
    formData.append(key, value);
  });

  return call(axios.post, url, formData, {
    headers: {
      'Content-type': `multipart/form-data boundary=${boundary}`
    }
  });
}
