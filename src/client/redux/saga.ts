import { all } from 'redux-saga/effects';

import task from './task/saga';
import map from './map/saga';

export default function* rootSaga() {
  yield all([task(), map()]);
}
