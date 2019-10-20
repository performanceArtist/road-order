import { GPSTrack } from '@shared/types';

import { haversine } from '../view/helpers';
import { MAP } from './actions';
import track from './track';

const initialState: {
  track: GPSTrack;
  routePath: GPSTrack;
  route: GPSTrack;
  hasArrived: boolean;
  measurementStarted: boolean;
  offTrack: boolean;
} = {
  track: [],
  routePath: [],
  route: [],
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
    case MAP.GET_ROUTE_PATH.SUCCESS:
      return { ...state, routePath: payload };
    case MAP.SET_HAS_ARRIVED:
      return { ...state, hasArrived: payload };
    case MAP.SET_MEASUREMENT_STATUS:
      return { ...state, measurementStarted: payload };
    default:
      return state;
  }
}
