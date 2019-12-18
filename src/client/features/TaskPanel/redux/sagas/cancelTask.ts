import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { sendAudio } from '@shared/utils';

import { taskActions } from '../index';

function* worker({ type, payload: [params] }: ReturnType<typeof taskActions.cancelTask.request>) {
  try {
    let response;
    const { taskId, coordinates, reason } = params;

    if (typeof reason !== 'string') {
      response = yield sendAudio('/api/audio-cancel', reason, {
        taskId,
        coordinates,
      });
    } else {
      response = yield call(axios.post, '/api/cancel', params);
    }

    yield put(taskActions.cancelTask.success());
  } catch ({ response }) {
    console.log(response);
    yield put(taskActions.cancelTask.failure(response.data));
  }
}

export default function* watcher() {
  yield takeLatest(taskActions.cancelTask.getType('request'), worker);
}
