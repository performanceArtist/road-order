import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');

import routes from '../client/routes';
import createStore from '../client/store';
import App from '../client/App';
import html from '../html';

const router = express.Router();

router.use(express.static(path.join(__dirname, '../static/public')));

router.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Hello world' });
});

router.get('/*', (req, res) => {
  const store = createStore();

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactDom = renderToString(jsx);
  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();

  res.send(html(reactDom, reduxState, helmetData));
});

export default router;
