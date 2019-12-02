import { Communication, initialCommunication } from '@shared/utils/redux-unit';
import { GPSTrack } from '@shared/types';

export type InitialState = {
  track: GPSTrack;
  routePath: GPSTrack;
  route: GPSTrack;
  hasArrived: boolean;
  measurementStarted: boolean;
  offTrack: boolean;
  getRoute: Communication,
  getRoutePath: Communication,
  simulateMovement: Communication,
  simulateMeasurement: Communication
};

export const initialState: InitialState = {
  track: [],
  routePath: [],
  route: [],
  hasArrived: false,
  measurementStarted: false,
  offTrack: false,
  getRoute: initialCommunication,
  getRoutePath: initialCommunication,
  simulateMovement: initialCommunication,
  simulateMeasurement: initialCommunication
};
