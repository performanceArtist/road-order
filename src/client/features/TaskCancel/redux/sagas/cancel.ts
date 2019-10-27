import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { sendAudio } from '@shared/utils';

import { CANCEL } from '../actions';
import {
  DatabaseRouteMarkType,
  GPSCoordinates
} from '@root/client/shared/types';

type CancelPayload = {
  taskId: number;
  markType: DatabaseRouteMarkType;
  coordinates: GPSCoordinates;
  audio?: any;
};
function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    let response;
    if (payload.markType === 'cancel_with-audio') {
      const { audio, taskId, coordinates, markType }: CancelPayload = payload;
      response = yield sendAudio('/api/audio-cancel', audio, {
        taskId,
        coordinates,
        markType
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
