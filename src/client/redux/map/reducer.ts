import { MAP } from './actions';

type Point = {
  latitude: number;
  longitude: number;
};

const initialState: { track: Array<Point> } = {
  track: [
    { latitude: 56.507909999999995, longitude: 85.02937200000001 },
    { latitude: 56.5121635, longitude: 85.0423701666667 },
    { latitude: 56.5119873333333, longitude: 85.0412813333 }
  ]
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
