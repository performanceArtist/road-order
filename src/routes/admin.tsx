import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import knex from '@root/connection';
const path = require('path');
const router = express.Router();

import App from '@root/client/entries/admin/App';
import render from '@root/utils/render';
import { User } from '../models/User';

router.use('/admin/', (req, res, next) => {
  console.log(req.user);
  if (!req.user || req.user.group !== 'admin')
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

router.post('/admin/create', async (req, res, next) => {
  try {
    const { name = 'Test', role, password } = req.body;
    const newUser = new User({ name, group_id: role, password });

    await newUser.create();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

export default router;
