import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import knex from '@root/connection';
import config from '@root/config';
import App from '@root/client/entries/login/App';
import { renderHTML } from '@root/utils';
import { DatabaseUser } from '@shared/types';
import { User } from '../models/User';

const jwt = require('jsonwebtoken');

const router = express.Router();

const sendApp = (url: string, res: express.Response) => {
  const jsx = (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  res.send(renderHTML({ reactDom, helmetData, bundle: 'login' }));
};

router.get('/login', (req, res) => {
  if (req.cookies.token) {
    res.redirect('/');
  } else {
    sendApp('/login', res);
  }
});

router.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) throw new Error('No password');

  const hash = User.hash(password);
  const user: DatabaseUser = await knex('users')
    .where({ password: hash })
    .first();

  if (!user) throw { type: 'login', message: 'Неверный логин или пароль' };

  const token = jwt.sign({ id: user.id }, config.auth.key);
  res.json({ token });
});

router.use('/', (req, res, next) => {
  if (req.cookies.token) {
    next();
  } else {
    sendApp('/', res);
  }
});

export default router;
