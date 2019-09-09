import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('.wrapper')
);

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(
  require.context('../../', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
