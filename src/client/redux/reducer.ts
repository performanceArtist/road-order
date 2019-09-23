import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import modals from './modal/reducer';
import tasks from './task/reducer';
import map from './map/reducer';
import cancel from '@client/features/CancelModal/redux/reducer';

const rootReducer = combineReducers({
  modals,
  tasks,
  map,
  cancel
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
