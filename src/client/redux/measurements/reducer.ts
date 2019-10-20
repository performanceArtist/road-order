import { ServerMeasurement } from '@shared/types';

import { MEASUREMENTS } from './actions';

type InitialState = {
  measurements: ServerMeasurement[];
};

const initialState: InitialState = {
  measurements: []
};

function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MEASUREMENTS.ADD: {
      return {
        ...state,
        measurements: state.measurements.concat(payload)
      };
    }
    default:
      return state;
  }
}

export default reducer;
