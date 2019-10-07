import { takeLatest, put } from 'redux-saga/effects';

import { sendAudio } from '@shared/utils';

import { ROAD } from '../actions';

function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    const { audio, taskId, latitude, longitude } = payload;
    const response = yield sendAudio('/api/mark', audio, {
      taskId,
      latitude,
      longitude
    });

    yield put({
      type: ROAD.MARK.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: ROAD.MARK.FAILURE, response: response.data });
  }
}

export default function* watcher() {
  yield takeLatest(ROAD.MARK.REQUEST, worker);
}
