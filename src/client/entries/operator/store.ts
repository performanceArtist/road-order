import rootReducer from '@redux/operator/reducer';
import rootSaga from '@redux/operator/saga';
import { createStore } from '../utils';

export default createStore({ rootReducer, rootSaga });
