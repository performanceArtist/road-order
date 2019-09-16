import { MAP } from './actions';

type Point = {
  latitude: number;
  longitude: number;
};

const initialState: {
  track: Array<Point>;
  hasArrived: boolean;
  measurementStarted: boolean;
} = {
  track: [],
  hasArrived: false,
  measurementStarted: false
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MAP.GET_ROUTE.SUCCESS:
      return { ...state, track: payload };
    case MAP.SET_HAS_ARRIVED:
      return { ...state, hasArrived: payload };
    case MAP.SET_MEASUREMENT_STATUS:
      return { ...state, measurementStarted: payload };
    default:
      return state;
  }
}
