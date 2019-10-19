export const MAP = {
  SET_HAS_ARRIVED: 'MAP.SET_HAS_ARRIVED',
  SET_MEASUREMENT_STATUS: 'MAP.SET_MEASUREMENT_STATUS',
  MOVE: 'MAP.MOVE',
  SET_CAR_POSITION: 'MAP.SET_CAR_POSITION',
  GET_ROUTE: {
    REQUEST: 'MAP.GET_ROUTE.REQUEST',
    SUCCESS: 'MAP.GET_ROUTE.SUCCESS',
    FAILURE: 'MAP.GET_ROUTE.FAILURE'
  },
  GET_ROUTE_PATH: {
    REQUEST: 'MAP.GET_ROUTE_PATH.REQUEST',
    SUCCESS: 'MAP.GET_ROUTE_PATH.SUCCESS',
    FAILURE: 'MAP.GET_ROUTE_PATH.FAILURE'
  }
};

export const setMeasurementStatus = (start: boolean) => ({
  type: MAP.SET_MEASUREMENT_STATUS,
  payload: start
});

export const setHasArrived = (arrived: boolean) => ({
  type: MAP.SET_HAS_ARRIVED,
  payload: arrived
});

export const getRoute = (points: [number, number][]) => ({
  type: MAP.GET_ROUTE.REQUEST,
  payload: points
});


export const getRoutePath = (points: [number, number][]) => ({
  type: MAP.GET_ROUTE_PATH.REQUEST,
  payload: points
});

export const move = (coordinates?: [number, number]) => ({
  type: MAP.MOVE,
  payload: coordinates
});
