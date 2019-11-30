import { ServerMeasurement } from '@shared/types';

export type InitialState = {
  measurements: ServerMeasurement[];
};

export const initialState: InitialState = {
  measurements: []
};
