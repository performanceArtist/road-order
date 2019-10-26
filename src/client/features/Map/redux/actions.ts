import { GPSTrack, ApiRequest } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const MAP = actionTree('MAP')({
  SET_HAS_ARRIVED: a.plain,
  SET_MEASUREMENT_STATUS: a.plain,
  GET_ROUTE: a.api,
  GET_ROUTE_PATH: a.api,
  SIMULATE_MOVEMENT: a.api,
  SIMULATE_MEASUREMENT: a.api
});

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

export const simulateMeasurement = (route: GPSTrack, taskId: number) => ({
  type: MAP.SIMULATE_MEASUREMENT.REQUEST,
  payload: { route, taskId }
});
