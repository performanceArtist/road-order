import { all } from 'redux-saga/effects';

import { saga as task } from '@features/TaskPanel/redux';
import { saga as map } from '@features/Map/redux';
import { cancel } from '@features/RecorderDialog/redux/sagas';
import { mark } from '@features/Road/redux/sagas';

export default function* rootSaga() {
  yield all([task(), map(), cancel(), mark()]);
}
