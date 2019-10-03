import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { reducer as modals } from '@features/Modal/redux';
import { reducer as tasks } from '@features/TaskPanel/redux';
import { reducer as map } from '@features/Map/redux';
import { reducer as cancel } from '@features/RecorderDialog/redux';
import { reducer as newTask } from '@features/OperatorTaskCreator/redux';

const rootReducer = combineReducers({
  modals,
  tasks,
  map,
  cancel,
  newTask
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
