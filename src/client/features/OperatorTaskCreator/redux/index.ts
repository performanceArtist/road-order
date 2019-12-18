import { reduxUnit, makeApiHandler } from '@shared/utils/redux-unit';
import { GPSCoordinates, TaskFormData, GPSTrack } from '@shared/types';

import { initialState } from './initial';

const unit = reduxUnit(initialState, {
  typePrefix: 'NEW_TASK'
});

const { actions, reducer } = unit({
  addRoutePoint: (state) => (routePoint: GPSCoordinates) =>
    ({ ...state, routePoints: state.routePoints.concat([routePoint]) }),
  removeLastRoutePoint: (state) => () =>
    ({ ...state, routePoints: state.routePoints.slice(0, -1) }),
  createTask: makeApiHandler<TaskFormData>()({
    communication: 'createTask'
  }),
  getLocation: makeApiHandler<{ search: string }>()({
    communication: 'getLocation',
    onSuccess: (state) => (location: GPSCoordinates) => ({ ...state, location })
  }),
  getRoute: makeApiHandler<{ points: GPSTrack }>()({
    communication: 'getRoute',
    onSuccess: (state) => (track: GPSTrack) => ({ ...state, track })
  })
});

export { actions as taskCreatorActions, reducer as taskCreatorReducer };
