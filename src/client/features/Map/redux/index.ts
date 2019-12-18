import { reduxUnit, makeApiHandler } from '@shared/utils/redux-unit';
import { GPSTrack } from '@shared/types';

import { initialState } from './initial';

const unit = reduxUnit(initialState, {
  typePrefix: 'MAP'
});

const { actions, reducer } = unit({
  setMeasurementStarted: (state) => (measurementStarted: boolean) =>
    ({ ...state, measurementStarted }),
  setHasArrived: (state) => (hasArrived: boolean) =>
    ({ ...state, hasArrived }),
  getRoute: makeApiHandler<{ points: GPSTrack }>()({
    communication: 'getRoute',
    onSuccess: (state) => (track: GPSTrack) => ({ ...state, track })
  }),
  getRoutePath: makeApiHandler<{ points: GPSTrack }>()({
    communication: 'getRoutePath',
    onSuccess: (state) => (routePath: GPSTrack) => ({ ...state, routePath })
  }),
  simulateMovement: makeApiHandler<{ route: GPSTrack }>()({
    communication: 'simulateMovement'
  }),
  simulateMeasurement: makeApiHandler<{ route: GPSTrack, taskId: number }>()({
    communication: 'simulateMeasurement'
  })
});

export { actions as mapActions, reducer as mapReducer };
