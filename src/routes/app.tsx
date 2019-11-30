import * as express from 'express';

import { Route, DatabaseUser, DatabaseUserGroup } from '@shared/types';
import { renderApp } from '@root/utils';
import config from '@root/config';
import knex from '@root/connection';

const jwt = require('jsonwebtoken');

const router = express.Router();

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
    const group: DatabaseUserGroup = await knex('user_group')
      .select('*')
      .where({
        id: user.group_id
      })
      .first();

    if (!group) throw new Error('No user group');

    req.user = {
      id: user.id,
      group: group.name,
      login: user.login
    };

    const routes = require(`@root/client/entries/${req.user.group}/routes`)
      .default;
    const paths = routes.map(({ path }: Route) => path);
    getRoutes(paths);

    next();
  } catch (error) {
    req.user = undefined;
    next(error);
  }
});

function getRoutes(paths: string[]) {
  return router.get(paths, (req, res) => {
    if (!req.user) {
      return res.status(500);
    }

    if (req.url === '/map') {
      res.send(
        renderApp(
          req.url,
          { from: req.query.from, to: req.query.to },
          req.user.group
        )
      );
    } else {
      res.send(renderApp(req.url, {}, req.user.group));
    }
  });
}

export default router;
