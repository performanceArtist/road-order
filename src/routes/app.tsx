import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

import { Route } from '@shared/types';

import render from '@root/utils/render';
import config from '@root/config';
import knex from '@root/connection';

router.use('/', async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('No auth');

    const payload = jwt.verify(token, config.auth.key);
    if (!payload) throw new Error('Invalid access token');

    const user = await knex('users')
      .select('*')
      .where({ id: payload.id })
      .first();
    if (!user) throw new Error('User not found');
    const group = await knex('user_group').select('*').where({
      id: user.group_id
    }).first();

    if(!group) throw new Error('No user group');

    req.user = {
      login: user.login,
      group: group.name
    };

    const userType =
      req.user.group === 'admin'
        ? 'driver'
        : req.user.group === 'user'
        ? 'driver'
        : req.user.group;
    const routes = require(`@root/client/entries/${userType}/routes`).default;
    const paths = routes.map(({ path }: Route) => path);
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
      req.user.group === 'admin'
        ? 'driver'
        : req.user.group === 'user'
        ? 'driver'
        : req.user.group;
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
