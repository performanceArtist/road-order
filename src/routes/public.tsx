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

router.get('/login', (req, res) => {
  if (req.cookies.token) {
    res.redirect('/');
  } else {
    sendApp('/login', res);
  }
});

router.post('/login', async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await knex('drivers')
      .select('*')
      .where({ uid })
      .first();

    if (!user) throw { type: 'uid', message: 'Несуществующий uid' };
    const token = jwt.sign({ uid }, config.auth.key);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/', (req, res, next) => {
  if (req.cookies.token) {
    next();
  } else {
    sendApp('/', res);
  }
});

export default router;
