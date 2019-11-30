import * as express from 'express';

import { User } from '../models/User';

const router = express.Router();

router.use('/admin/', (req, res, next) => {
  if (!req.user || req.user.group !== 'admin')
    return res.status(401).send('<h1>Unauthorized</h1>');
  next();
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
