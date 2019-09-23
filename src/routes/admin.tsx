import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import knex from '@root/connection';
const path = require('path');
const router = express.Router();

import App from '@root/client/entries/admin/app';
import render from '@root/utils/render';

router.use('/admin/', (req, res, next) => {
  console.log(req.user);
  if (!req.user || req.user.role !== 'admin')
    return res.status(401).send('<h1>Unauthorized</h1>');
  next();
});

router.get('/admin/', (req, res) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  res.send(render({ reactDom, helmetData, bundle: 'admin' }));
});

const createUser = async (role: 'admin' | 'driver' | 'operator') => {
  await knex('drivers').insert({
    role,
    name: 'Test',
    uid: Math.floor(Math.random() * 1000000)
  });
};

router.post('/admin/create', async (req, res, next) => {
  try {
    await createUser(req.body.role);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

export default router;
