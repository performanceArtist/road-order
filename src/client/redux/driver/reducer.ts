import { combineReducers } from 'redux';
import { StateType } from '@shared/types';

import { reducer as modals } from '@features/Modal/redux';
import { reducer as tasks } from '@root/client/features/TaskPanel/redux';
import { reducer as map } from '@features/Map/redux';

import { reducer as condor } from '../condor';
import io from '../io/reducer';

const rootReducer = combineReducers({
  modals,
  tasks,
  map,
  condor,
  io
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
