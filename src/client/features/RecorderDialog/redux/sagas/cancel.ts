import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { sendAudio } from '@shared/utils';

import { CANCEL } from '../actions';

function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    let response;
    if (payload.reason === 'in-audio') {
      const { audio, taskId } = payload;
      response = yield sendAudio('/api/audio', audio, { taskId });
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