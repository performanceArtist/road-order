import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

import { IRoute } from '@shared/types';

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

    const userType =
      req.user.role === 'admin'
        ? 'driver'
        : req.user.role === 'user'
        ? 'driver'
        : req.user.role;
    const routes = require(`@root/client/entries/${userType}/routes`).default;
    const paths = routes.map(({ path }: IRoute) => path);
    getRoutes(paths);

    next();
  } catch (error) {
    console.log(error);
    req.user = null;
    res.status(401).json({ error: 'Unauthorized' });
  }
});

const renderApp = (url: string, props: any = {}, userType = 'user') => {
  const store = require(`@root/client/entries/${userType}/store`).default(
    false
  );
  const App = require(`@root/client/entries/${userType}/App`).default;

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

  return render({ reactDom, reduxState, helmetData, bundle: userType });
};

function getRoutes(paths: string[]) {
  return router.get(paths, (req, res) => {
    const userType =
      req.user.role === 'admin'
        ? 'driver'
        : req.user.role === 'user'
        ? 'driver'
        : req.user.role;
    if (req.url === '/map') {
      res.send(
        renderApp(req.url, { from: req.query.from, to: req.query.to }, userType)
      );
    } else {
      res.send(renderApp(req.url, {}, userType));
    }
  });
}

export default router;
