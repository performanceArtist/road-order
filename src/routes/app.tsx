import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

import routes from '@root/client/entries/user/routes';
import createStore from '@root/client/entries/user/store';
import App from '@root/client/entries/user/App';
import render from '@root/utils/render';
import config from '@root/config';
import knex from '@root/connection';

router.use('/', async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('No auth');

    const payload = jwt.verify(token, config.auth.key);
    const user = await knex('drivers')
      .select('*')
      .where({ uid: payload.uid })
      .first();
    if (!user) throw new Error('User not found');
    req.user = user;

    next();
  } catch (error) {
    req.user = null;
    res.status(401).json({ error: 'Unauthorized' });
  }
});

const renderApp = (url: string, props: any = {}) => {
  const store = createStore();

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={`${url}`}>
        <App props={props} />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactDom = renderToString(jsx);
  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();

  return render({ reactDom, reduxState, helmetData, bundle: 'user' });
};

router.get('/map', (req, res) => {
  res.send(renderApp(req.url, { from: req.query.from, to: req.query.to }));
});

const paths = routes.map(({ path }) => path);
router.get(paths, (req, res, next) => {
  res.send(renderApp(req.url));
});

export default router;
