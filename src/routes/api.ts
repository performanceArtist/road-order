import * as express from 'express';

import 'multer'; // Need this to use Express.Multer.File
const multer = require('multer');
const path = require('path');

import { TaskFormData, GPSTrack } from '@shared/types';
import { getCondorInfo } from '@root/controllers/condor';
import { createTask, getServerTasks, roadMark } from '@root/controllers/task';
import {
  simulateMovement,
  simulateMeasurement
} from '@root/controllers/simulation';
import { getRoute, findLocation } from '@root/controllers/route';
import { asyncHandler } from '../utils';

type MulterRoute = (
  req: express.Request,
  file: Express.Multer.File,
  cb: (err: any, path: string) => void
) => void;
type MulterStorage = {
  destination: MulterRoute;
  filename: MulterRoute;
};

const multerStorage: MulterStorage = {
  destination: (req, file, cb) => {
    cb(null, path.resolve('dist/uploads'));
  },
  filename: function(req, file, cb) {
    return cb(null, file.originalname);
  }
};

const storage = multer.diskStorage(multerStorage);
const upload = multer({ storage });
const router = express.Router();

router.post('/api/mark', upload.single('audio'), (req, res) => {
  res.status(200).send(req.body.taskId);
});

router.post(
  '/api/audio-cancel',
  upload.single('audio'),
  asyncHandler(async (req, res) => {
    console.log(req.body);
    await roadMark({ ...req.body, audioPath: req.file.filename });
    res.status(200).send('ok');
  })
);

router.post(
  '/api/cancel',
  asyncHandler(async (req, res) => {
    console.log(req.body);
    await roadMark(req.body);
    res.status(200).send('ok');
  })
);

router.get(
  '/api/route',
  asyncHandler(async (req, res) => {
    const points: GPSTrack = req.query.points.map(JSON.parse);
    const route = await getRoute(points);
    res.json(route);
  })
);

router.get(
  '/api/location',
  asyncHandler(async (req, res) => {
    const { search = 'Томск' } = req.query;
    const location = await findLocation(search);
    res.json(location);
  })
);

router.get(
  '/api/tasks',
  asyncHandler(async (req, res) => {
    if (!req.user) throw new Error('No user');

    const tasks = await getServerTasks({
      user: req.user.group === 'operator' ? req.user.id : undefined
    });
    const result = req.user.group === 'driver'
    ? tasks.filter(task => task.status === 'ready')
    : tasks;

    res.json(result);
  })
);

router.post(
  '/api/task/create',
  asyncHandler(async (req, res) => {
    await createTask(req.body as TaskFormData);
    res.sendStatus(200);
  })
);

router.get(
  '/api/condor',
  asyncHandler(async (req, res) => {
    const condor = await getCondorInfo();
    res.json(condor);
  })
);

router.post('/api/simulate/movement', async (req, res) => {
  const route = req.body.route as GPSTrack;
  if (!route) res.status(500).json({ error: 'No route param' });

  simulateMovement(route);

  res.send('ok');
});

router.post('/api/simulate/measurement', async (req, res) => {
  const route = req.body.route as GPSTrack;
  const orderId = req.body.taskId as number;

  simulateMeasurement(route, orderId);

  res.send('ok');
});

/*
router.get('/api/temp', async (req, res) => {
  await createAdmin();
  res.sendStatus(200);
});*/

router.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    res.status(error.statusCode || error.status || 500).json({ error });
  }
);

export default router;
