import { reduxUnit } from '@shared/utils/redux-unit';
import { ServerMeasurement } from '@shared/types';

import { initialState } from './initial';

const unit = reduxUnit(initialState, { typePrefix: 'MEASUREMENTS' });
const { creators, reducer } = unit({
  add: (state) => (measurement: ServerMeasurement) =>
    ({ ...state, measurements: state.measurements.concat(measurement)})
});

export { creators, reducer };
