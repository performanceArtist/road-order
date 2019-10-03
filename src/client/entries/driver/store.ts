import rootReducer from '@root/client/redux/driver/reducer';
import rootSaga from '@root/client/redux/driver/saga';
import { createStore } from '../utils';

export default createStore({ rootReducer, rootSaga });
