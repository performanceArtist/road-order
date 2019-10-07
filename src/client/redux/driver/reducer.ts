import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { reducer as modals } from '@features/Modal/redux';
import { reducer as tasks } from '@features/TaskPanel/redux';
import { reducer as map } from '@features/Map/redux';
import { reducer as cancel } from '@root/client/features/TaskCancel/redux';

const rootReducer = combineReducers({
  modals,
  tasks,
  map,
  cancel
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
