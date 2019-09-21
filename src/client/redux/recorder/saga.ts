import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { RECORDER } from './actions';

function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    const formData = new FormData();
    const file = new File([payload], `${Date.now()}.webM`);
    console.log(file);
    formData.append('audio', file);
    yield call(axios.post, '/api/audio', formData, {
      headers: {
        'Content-type': `multipart/form-data boundary=${formData._boundary}`
      }
    });

    yield put({ type: RECORDER.SAVE_AUDIO.SUCCESS });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: RECORDER.SAVE_AUDIO.FAILURE, response: response.data });
  }
}

export default function* watcher() {
  yield takeLatest(RECORDER.SAVE_AUDIO.REQUEST, worker);
}
