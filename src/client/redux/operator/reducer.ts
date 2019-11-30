import { combineReducers } from 'redux';
import { StateType } from '@shared/types';

import { reducer as modals } from '@features/Modal/redux';
import { reducer as tasks } from '@root/client/features/TaskPanel/redux';
import { reducer as map } from '@features/Map/redux';
import { reducer as cancel } from '@root/client/features/TaskCancel/redux';
import { reducer as newTask } from '@features/OperatorTaskCreator/redux';

import { reducer as condor } from '../condor';
import io from '../io/reducer';
import { reducer as measurements } from '../measurements';

const rootReducer = combineReducers({
  modals,
  tasks,
  map,
  cancel,
  newTask,
  io,
  condor,
  measurements
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
