import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { NEWTASK } from '../actions';

function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/location', {
      params: {
        search: payload
      }
    });

    yield put({
      type: NEWTASK.LOCATION_SEARCH.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({
      type: NEWTASK.LOCATION_SEARCH.FAILURE,
      response: response.data
    });
  }
}

export default function* watcher() {
  yield takeLatest(NEWTASK.LOCATION_SEARCH.REQUEST, worker);
}
