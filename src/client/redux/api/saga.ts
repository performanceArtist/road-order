import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { SERVER } from './actions';

function* createWorker(action: { type: string; payload: any }) {
  try {
    const postResult = yield call(axios.get, 'api/test');

    const { status } = postResult.data;

    if (status !== 'ok') {
      console.error(postResult);
      throw new Error(`Request failed`);
    }

    yield put({
      type: SERVER.GET.SUCCESS,
      payload: postResult.data.message
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SERVER.GET.FAILURE, error: error });
  }
}

export default function* createWatcher() {
  yield takeLatest(SERVER.GET.REQUEST, createWorker);
}
