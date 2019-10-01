import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { NEWTASK } from './actions';

function* worker({ type, payload }: { type: string; payload: any }) {
  try {
    const response = yield call(axios.post, '/api/task/create', payload);

    yield put({
      type: NEWTASK.POST.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: NEWTASK.POST.FAILURE, response: response.data });
  }
}

export default function* watcher() {
  yield takeLatest(NEWTASK.POST.REQUEST, worker);
}
