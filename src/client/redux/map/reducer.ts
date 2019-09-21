import { haversine } from '@client/features/Map/helpers';
import { MAP } from './actions';
import track from './track';

const initialState: {
  track: Array<[number, number]>;
  hasArrived: boolean;
  measurementStarted: boolean;
  offTrack: boolean;
} = {
  track,
  carPosition: track[0],
  hasArrived: false,
  measurementStarted: false,
  offTrack: false
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
    case MAP.MOVE:
      const next = payload || state.track[1];
      if (!next) return state;

      const closest = haversine(state.track, next);
      const track = state.track.slice(closest + 1, state.track.length);
      console.log(closest, track, next);

      return {
        ...state,
        carPosition: track.length > 0 ? track[0] : state.carPosition,
        track,
        hasArrived: track.length === 0
      };
    case MAP.SET_CAR_POSITION:
      return { ...state, carPosition: payload };
    default:
      return state;
  }
}
