import { reduxUnit, apiHandler } from '@shared/utils/redux-unit';
import { GPSCoordinates, TaskFormData, GPSTrack } from '@shared/types';

import { initialState } from './initial';

const unit = reduxUnit(initialState, {
  typePrefix: 'NEW_TASK'
});

const { creators, reducer } = unit({
  addRoutePoint: (state) => (routePoint: GPSCoordinates) =>
    ({ ...state, routePoints: state.routePoints.concat([routePoint]) }),
  removeLastRoutePoint: (state) => () =>
    ({ ...state, routePoints: state.routePoints.slice(0, -1) }),
  createTask: apiHandler({
    communication: 'createTask',
    onRequest: (state) => (formData: TaskFormData) => state
  }),
  getLocation: apiHandler({
    communication: 'getLocation',
    onRequest: (state) => (params: { search: string }) => state,
    onSuccess: (state) => (location: GPSCoordinates) => ({ ...state, location })
  }),
  getRoute: apiHandler({
    communication: 'getRoute',
    onRequest: (state) => (params: { points: GPSTrack }) => state,
    onSuccess: (state) => (track: GPSTrack) => ({ ...state, track })
  })
});

export { creators, reducer };
