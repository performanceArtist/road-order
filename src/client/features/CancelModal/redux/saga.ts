import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { CANCEL } from './actions';

function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    let response;
    if (payload.reason === 'in-audio') {
      const formData = new FormData();
      const file = new File([payload.audio], `${Date.now()}.webM`);
      formData.append('audio', file);
      formData.append('taskId', payload.taskId);
      response = yield call(axios.post, '/api/audio', formData, {
        headers: {
          'Content-type': `multipart/form-data boundary=${formData._boundary}`
        }
      });
    } else {
      response = yield call(axios.post, '/api/cancel', payload);
    }

    yield put({
      type: CANCEL.WITH_REASON.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: CANCEL.WITH_REASON.FAILURE, response: response.data });
  }
}

export default function* watcher() {
  yield takeLatest(CANCEL.WITH_REASON.REQUEST, worker);
}
