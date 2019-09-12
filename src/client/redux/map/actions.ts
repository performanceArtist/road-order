export const MAP = {
  GET_ROUTE: {
    REQUEST: 'MAP.GET_ROUTE.REQUEST',
    SUCCESS: 'MAP.GET_ROUTE.SUCCESS',
    FAILURE: 'MAP.GET_ROUTE.FAILURE'
  }
};

export const getRoute = (from: string, to: string) => ({
  type: MAP.GET_ROUTE.REQUEST,
  payload: { from, to }
});
