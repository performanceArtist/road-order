import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();

import knex from '@root/connection';
import config from '@root/config';
import App from '@root/client/entries/public/app';
import render from '@root/utils/render';

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

router.get('/', (req, res) => {
  sendApp('/', res);
});

router.get('/login', (req, res) => {
  const { token, login } = req.cookies;
  if (token && login) {
    res.redirect('/');
  } else {
    sendApp('/login', res);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex('users')
      .where({ login: username })
      .first();

    if (!user) throw { type: 'login', message: 'Неверный логин' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { type: 'password', message: 'Неверный пароль' };

    const token = jwt.sign({ login: user.login }, config.auth.key);
    res.json({ token, login: user.login });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
