import { reduxUnit, apiHandler } from '@shared/utils/redux-unit';
import { GPSTrack } from '@shared/types';

import { initialState } from './initial';

const unit = reduxUnit(initialState, {
  typePrefix: 'MAP'
});

const { creators, reducer } = unit({
  setMeasurementStarted: (state) => (measurementStarted: boolean) =>
    ({ ...state, measurementStarted }),
  setHasArrived: (state) => (hasArrived: boolean) =>
    ({ ...state, hasArrived }),
  getRoute: apiHandler({
    communication: 'getRoute',
    onSuccess: (state) => (track: GPSTrack) => ({ ...state, track })
  }),
  getRoutePath: apiHandler({
    communication: 'getRoutePath',
    onSuccess: (state) => (routePath: GPSTrack) => ({ ...state, routePath })
  }),
  simulateMovement: apiHandler({
    communication: 'simulateMovement',
    onRequest: (state) => (route: GPSTrack) => state
  }),
  simulateMeasurement: apiHandler({
    communication: 'simulateMeasurement',
    onRequest: (state) => (route: GPSTrack, taskId: number) => state
  })
});

export { creators, reducer };
