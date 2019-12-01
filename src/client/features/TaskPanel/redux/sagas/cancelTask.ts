import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { sendAudio } from '@shared/utils';

import { CancelTaskParams } from '../types';
import { creators } from '../index';
const { cancelTask } = creators;

function* worker({ type, payload }: { type: string; payload: [CancelTaskParams] }) {
  try {
    console.log('params', payload);
    let response;
    const { taskId, coordinates, reason }: CancelTaskParams = payload[0];

    if (typeof reason !== 'string') {
      response = yield sendAudio('/api/audio-cancel', reason, {
        taskId,
        coordinates,
      });
    } else {
      response = yield call(axios.post, '/api/cancel', payload[0]);
    }

    yield put(cancelTask.success(response.data));
  } catch ({ response }) {
    console.log(response);
    yield put(cancelTask.failure(response.data));
  }
}

export default function* watcher() {
  yield takeLatest(cancelTask.getType('request'), worker);
}
