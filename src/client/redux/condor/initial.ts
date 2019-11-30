import { GPSCoordinates } from '@shared/types';

export type InitialState = {
  speed: number;
  coordinates: GPSCoordinates;
};

export const initialState: InitialState = {
  speed: 0,
  coordinates: [0, 0]
};
