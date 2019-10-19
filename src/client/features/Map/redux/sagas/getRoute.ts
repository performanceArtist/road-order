import { takeEvery, call, put} from 'redux-saga/effects';
import axios from 'axios';

import { MAP } from '../actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/route', {
      params: {
        points: JSON.stringify(action.payload)
      }
    });

    yield put({
      type: action.type === MAP.GET_ROUTE.REQUEST ? MAP.GET_ROUTE.SUCCESS : MAP.GET_ROUTE_PATH.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: MAP.GET_ROUTE.FAILURE, response: response.data });
  }
}

export default function* getWatcher() {
  yield takeEvery([MAP.GET_ROUTE.REQUEST, MAP.GET_ROUTE_PATH.REQUEST], getWorker);
}
