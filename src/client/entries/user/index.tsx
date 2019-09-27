import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import rootReducer from '@redux/reducer';
import rootSaga from '@redux/saga';

import { getRootContainer, createStore } from '../utils';
import App from './App';

const RootContainer = getRootContainer(
  App,
  createStore({ rootReducer, rootSaga, browser: true })
);

/*
if (module.hot) {
  module.hot.accept('', () => {
    ReactDOM.render(
      <AppContainer>
        <RootContainer />
      </AppContainer>,
      document.querySelector('.wrapper')
    );
  });
}
*/

ReactDOM.hydrate(RootContainer, document.querySelector('.wrapper'));

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(
  require.context('../../', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
