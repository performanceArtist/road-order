import { all } from 'redux-saga/effects';

import { getTasks } from '@features/TaskPanel/redux/sagas';
import {
  getRoute,
  simulateMovement,
  simulateMeasurement
} from '@features/Map/redux/sagas';
import { cancel } from '@root/client/features/TaskCancel/redux/sagas';
import { mark } from '@features/Road/redux/sagas';
import socket from '@redux/io/socket';

export default function* rootSaga() {
  yield all([
    getTasks(),
    getRoute(),
    simulateMovement(),
    simulateMeasurement(),
    cancel(),
    mark(),
    socket.startStopChannel()
  ]);
}
