import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '../utils';
import App from './App';

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.querySelector('.wrapper')
);

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(
  require.context('../../', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
