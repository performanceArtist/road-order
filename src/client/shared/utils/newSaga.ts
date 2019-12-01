import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ApiActionCreator } from '@shared/utils/redux-unit';

type Args<T> = {
  url: string;
  apiAction: T | T[];
  method?: 'get' | 'post';
};

export function request<T extends ApiActionCreator<any, any>>({ url, method = 'get', apiAction }: Args<T>) {
  let action: T | undefined;

  function* worker({ type, payload }: { type: string, payload: any }) {
    try {
      const response = method === 'get'
      ? yield call(axios.get, url, {
          params: payload
        })
      : yield call(axios.post, url, payload);

      action = !Array.isArray(apiAction)
      ? apiAction
      : apiAction.find(({ request }) => request().type === type);

      if (!action) throw new Error('No action found');

      yield put(action.success(response.data));
    } catch ({ response }) {
      console.log(response);
      if (action) {
        yield put(action.failure(response.data));
      }
    }
  }

  if (Array.isArray(apiAction)) {
    return function* watcher() {
      yield takeEvery(apiAction.map(a => a.getType('request')), worker);
    };
  }
  return function* watcher() {
    yield takeLatest([apiAction.getType('request')], worker);
  };

}
