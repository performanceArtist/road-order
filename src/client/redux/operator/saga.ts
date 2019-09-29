import { all } from 'redux-saga/effects';

import { saga as task } from '@features/TaskPanel/redux';
import { saga as map } from '@features/Map/redux';
import { saga as cancel } from '@features/CancelModal/redux';

export default function* rootSaga() {
  yield all([task(), map(), cancel()]);
}
