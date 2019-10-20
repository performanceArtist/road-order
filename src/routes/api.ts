import * as express from 'express';
import axios from 'axios';

const polyline = require('@mapbox/polyline');
import 'multer'; // Need this to use Express.Multer.File
const multer = require('multer');
const path = require('path');

import { TaskFormData, GPSTrack, GPSCoordinates } from '@shared/types';
import { getCondorInfo } from '@root/controllers/condor';
import { createTask, getServerTasks } from '@root/controllers/task';
import {
  simulateMovement,
  simulateMeasurement
} from '@root/controllers/simulation';

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

router.get('/api/route', (req, res) => {
  const points: GPSTrack = req.query.points.map(JSON.parse);

  if (!points || points.length < 2)
    return res.status(500).send('Wrong coordinates');
  const locs = points.map(([lat, lon]) => `loc=${lat},${lon}`).join('&');

  axios
    .get(
      `http://routes.maps.sputnik.ru/osrm/router/viaroute?${locs}&instructions=true`
    )
    .then(response => {
      // fix comma position
      const data = polyline
        .decode(response.data.route_geometry)
        .map(([lat, lon]: GPSCoordinates) => [lat / 10, lon / 10]);
      res.send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.post('/api/audio', upload.single('audio'), (req, res) => {
  res.status(200).send(req.body.taskId);
});

router.post('/api/mark', upload.single('audio'), (req, res) => {
  res.status(200).send(req.body.taskId);
});

router.post('/api/cancel', (req, res) => {
  const reasons = ['road-works', 'car-crash-ahead', 'mechanical-failure'];
  const { reason, taskId } = req.body;

  if (!taskId || !reasons.includes(reason)) {
    res
      .status(500)
      .json({ error: `Invalid reason(${reason}) or task id(${taskId})` });
  } else {
    res.json(taskId);
  }
});

router.get('/api/location', (req, res) => {
  const { search = 'Томск' } = req.query;

  axios
    .get('http://search.maps.sputnik.ru/search', {
      params: {
        q: search
      }
    })
    .then(response => {
      const data = response.data.result[0].position;

      res.json([data.lat, data.lon]);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.get('/api/tasks', async (req, res) => {
  try {
    if (!req.user) throw new Error('No user');

    const tasks = await getServerTasks({
      user: req.user.group === 'operator' ? req.user.id : undefined
    });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/api/task/create', async (req, res) => {
  try {
    await createTask(req.body as TaskFormData);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/api/condor', async (req, res) => {
  try {
    const condor = await getCondorInfo();
    res.json(condor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

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

export default router;
