import rootReducer from '@redux/user/reducer';
import rootSaga from '@redux/user/saga';
import { createStore } from '../utils';

export default createStore({ rootReducer, rootSaga });
