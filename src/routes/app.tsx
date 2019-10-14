import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const jwt = require('jsonwebtoken');
const router = express.Router();

import { Route, DatabaseUser, DatabaseUserGroup } from '@shared/types';

import render from '@root/utils/render';
import config from '@root/config';
import knex from '@root/connection';

router.use('/', async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('No auth');

    const payload = jwt.verify(token, config.auth.key);
    if (!payload) throw new Error('Invalid access token');

    const user: DatabaseUser = await knex('users')
      .select('*')
      .where({ id: payload.id })
      .first();
    if (!user) throw new Error('User not found');
    const group: DatabaseUserGroup = await knex('user_group').select('*').where({
      id: user.group_id
    }).first();

    if(!group) throw new Error('No user group');

    req.user = {
      id: user.id,
      group: group.name,
      login: user.login
    };

    const routes = require(`@root/client/entries/${req.user.group}/routes`).default;
    const paths = routes.map(({ path }: Route) => path);
    getRoutes(paths);

    next();
  } catch (error) {
    console.log(error);
    req.user = undefined;
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
    if(!req.user) {
      return res.status(500);
    }

    if (req.url === '/map') {
      res.send(
        renderApp(req.url, { from: req.query.from, to: req.query.to }, req.user.group)
      );
    } else {
      res.send(renderApp(req.url, {}, req.user.group));
    }
  });
}

export default router;
