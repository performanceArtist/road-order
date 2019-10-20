import { GPSTrack, ApiRequest } from '@shared/types';
import { apiAction } from '@shared/utils';

export const MAP = {
  SET_HAS_ARRIVED: 'MAP.SET_HAS_ARRIVED',
  SET_MEASUREMENT_STATUS: 'MAP.SET_MEASUREMENT_STATUS',
  GET_ROUTE: apiAction('MAP', 'GET_ROUTE'),
  GET_ROUTE_PATH: apiAction('MAP', 'GET_ROUTE_PATH'),
  SIMULATE_MOVEMENT: apiAction('MAP', 'SIMULATE_MOVEMENT')
};

export const setMeasurementStatus = (start: boolean) => ({
  type: MAP.SET_MEASUREMENT_STATUS,
  payload: start
});

export const setHasArrived = (arrived: boolean) => ({
  type: MAP.SET_HAS_ARRIVED,
  payload: arrived
});

export const getRoute = (points: GPSTrack): ApiRequest => ({
  type: MAP.GET_ROUTE.REQUEST,
  payload: { points }
});

export const getRoutePath = (points: GPSTrack): ApiRequest => ({
  type: MAP.GET_ROUTE_PATH.REQUEST,
  payload: { points }
});

export const simulateMovement = (route: GPSTrack): ApiRequest => ({
  type: MAP.SIMULATE_MOVEMENT.REQUEST,
  payload: { route }
});
