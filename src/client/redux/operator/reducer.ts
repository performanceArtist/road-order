import { combineReducers } from 'redux';
import { StateType } from '@shared/types';

import { reducer as modals } from '@features/Modal/redux';
import { tasksReducer } from '@root/client/features/TaskPanel/redux';
import { mapReducer } from '@root/client/features/Map/redux';
import { taskCreatorReducer } from '@root/client/features/OperatorTaskCreator/redux';

import { condorReducer } from '../condor';
import { measurementsReducer } from '../measurements';
import io from '../io/reducer';

const rootReducer = combineReducers({
  modals,
  tasks: tasksReducer,
  map: mapReducer,
  newTask: taskCreatorReducer,
  io,
  condor: condorReducer,
  measurements: measurementsReducer
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
