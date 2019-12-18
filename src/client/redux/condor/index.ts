import { CondorValue } from '@shared/types';
import { reduxUnit } from '@shared/utils/redux-unit';

import { initialState } from './initial';

const unit = reduxUnit(initialState, { typePrefix: 'CONDOR' });
const { actions, reducer } = unit({
  update: (state) => (value: CondorValue) => ({ ...state, [value.key]: value.value })
})

export { actions as condorActions, reducer as condorReducer };
