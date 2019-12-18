import { combineReducers } from 'redux';
import { StateType } from '@shared/types';

import { reducer as modals } from '@features/Modal/redux';
import { tasksReducer } from '@root/client/features/TaskPanel/redux';
import { mapReducer } from '@root/client/features/Map/redux';

import { condorReducer } from '../condor';
import io from '../io/reducer';

const rootReducer = combineReducers({
  modals,
  tasks: tasksReducer,
  map: mapReducer,
  condor: condorReducer,
  io
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
