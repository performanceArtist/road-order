import { all } from 'redux-saga/effects';

import { getTasks } from '@features/TaskPanel/redux/sagas';
import { getRoute } from '@features/Map/redux/sagas';
import { cancel } from '@root/client/features/TaskCancel/redux/sagas';
import { mark } from '@features/Road/redux/sagas';

export default function* rootSaga() {
  yield all([getTasks(), getRoute(), cancel(), mark()]);
}
