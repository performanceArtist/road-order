import { all } from 'redux-saga/effects';

import request from './api/saga';

export default function* rootSaga() {
  yield all([request()]);
}
