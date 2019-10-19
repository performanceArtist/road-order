import { GPSCoordinates, CondorValue } from '@shared/types';

import { CONDOR } from './actions';

type InitialState = {
  speed: number;
  coordinates: GPSCoordinates;
};

const initialState: InitialState = {
  speed: 0,
  coordinates: [0, 0]
};

function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case CONDOR.UPDATE:
      const value = payload as CondorValue;
      return { ...state, [value.key]: value.value };
    default:
      return state;
  }
}

export default reducer;
