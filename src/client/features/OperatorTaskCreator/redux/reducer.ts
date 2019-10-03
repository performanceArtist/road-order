import { NEWTASK } from './actions';

type IState = {
  location: [number, number];
  from?: [number, number];
  to?: [number, number];
  track: [number, number][];
};

const initialState: IState = {
  location: [56.472596, 84.950367],
  from: null,
  to: null,
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
    case NEWTASK.SET_FROM:
      return { ...state, from: payload };
    case NEWTASK.SET_TO:
      return { ...state, to: payload };
    case NEWTASK.GET_ROUTE.SUCCESS:
      return { ...state, track: payload };
    default:
      return state;
  }
}
