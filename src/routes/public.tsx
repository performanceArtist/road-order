import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
const jwt = require('jsonwebtoken');
const router = express.Router();

import knex from '@root/connection';
import config from '@root/config';
import App from '@root/client/entries/public/App';
import render from '@root/utils/renderHTML';
import { User } from '../models/User';
import { DatabaseUser } from '@root/client/shared/types';

const sendApp = (url: string, res: express.Response) => {
  const jsx = (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  res.send(render({ reactDom, helmetData, bundle: 'login' }));
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

  try {
    if (!password) throw new Error('No password');

    const hash = User.hash(password);
    const user: DatabaseUser = await knex('users')
      .where({ password: hash })
      .first();

    if (!user) throw { type: 'login', message: 'Неверный логин или пароль' };

    const token = jwt.sign({ id: user.id }, config.auth.key);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.use('/', (req, res, next) => {
  if (req.cookies.token) {
    next();
  } else {
    sendApp('/', res);
  }
});

export default router;
