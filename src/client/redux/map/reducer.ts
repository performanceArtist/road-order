import { MAP } from './actions';

type Point = {
  latitude: number;
  longitude: number;
};

const initialState: { track: Array<Point> } = {
  track: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MAP.GET_ROUTE.SUCCESS:
      return { ...state, track: payload };
    default:
      return state;
  }
}
