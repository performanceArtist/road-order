import { CondorValue } from '@shared/types';
import { reduxUnit } from '@shared/utils/redux-unit';

import { initialState } from './initial';

const unit = reduxUnit(initialState, { typePrefix: 'CONDOR' });
const { creators, reducer } = unit({
  update: (state) => (value: CondorValue) => ({ ...state, [value.key]: value.value })
})

export { creators, reducer };
