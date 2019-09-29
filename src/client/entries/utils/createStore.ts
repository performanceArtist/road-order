import {
  createStore,
  applyMiddleware,
  compose,
  Reducer,
  AnyAction
} from 'redux';
import createSagaMiddleware from 'redux-saga';

function getPreloadedState() {
  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  return preloadedState;
}

interface Args {
  initialState?: any;
  rootSaga: any;
  rootReducer: Reducer<any, AnyAction>;
}

export default ({ rootSaga, rootReducer }: Args) => (browser: boolean) => {
  let enhancer;
  const sagaMiddleware = createSagaMiddleware();
  const initialState = browser ? getPreloadedState() : {};

  if (browser) {
    const composeEnhancer =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancer(applyMiddleware(sagaMiddleware));
  } else {
    enhancer = applyMiddleware(sagaMiddleware);
  }

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};
