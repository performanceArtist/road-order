import { Communication, initialCommunication } from '@shared/utils/redux-unit';
import { GPSTrack, GPSCoordinates } from '@shared/types';

export type InitialState = {
  location?: GPSCoordinates;
  routePoints: GPSTrack;
  track: GPSTrack;
  createTask: Communication;
  getLocation: Communication;
  getRoute: Communication;
};

export const initialState: InitialState = {
  location: undefined,
  routePoints: [],
  track: [],
  createTask: initialCommunication,
  getLocation: initialCommunication,
  getRoute: initialCommunication
};
