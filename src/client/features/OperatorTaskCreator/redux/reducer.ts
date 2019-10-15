import { NEWTASK } from './actions';

type IState = {
  location: [number, number];
  routePoints: [number, number][];
  track: [number, number][];
};

const initialState: IState = {
  location: [56.472596, 84.950367],
  routePoints: [],
  track: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case NEWTASK.LOCATION_SEARCH.SUCCESS:
      if (!payload) return state;
      return { ...state, location: payload };
    case NEWTASK.ADD_ROUTE_POINT:
      return { ...state, routePoints: state.routePoints.concat([payload]) };
    case NEWTASK.REMOVE_LAST_ROUTE_POINT:
        return {
          ...state,
          routePoints: state.routePoints.slice(0, -1),
        };
    case NEWTASK.GET_ROUTE.SUCCESS:
      return {
        ...state,
        track: payload
      };
    default:
      return state;
  }
}
