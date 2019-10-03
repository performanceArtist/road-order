import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { TASK } from '../actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/task', action.payload);
    yield put({
      type: TASK.GET.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: TASK.GET.FAILURE, response: response.data });
  }
}

export default function* getWatcher() {
  yield takeLatest(TASK.GET.REQUEST, getWorker);
}
