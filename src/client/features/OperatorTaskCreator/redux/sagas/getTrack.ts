import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { NEWTASK } from '../actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/route', {
      params: {
        points: JSON.stringify(action.payload)
      }
    });

    yield put({
      type: NEWTASK.GET_ROUTE.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: NEWTASK.GET_ROUTE.FAILURE, response: response.data });
  }
}

export default function* getWatcher() {
  yield takeLatest(NEWTASK.GET_ROUTE.REQUEST, getWorker);
}
