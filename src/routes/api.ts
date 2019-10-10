import * as express from 'express';
import axios from 'axios';
import { createAdmin } from '../controllers/user';
import { createTask } from '../controllers/task';
import { TaskFormData } from '@root/client/shared/types';

const polyline = require('@mapbox/polyline');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve('dist/uploads'));
  },
  filename: function(req, file, cb) {
    return cb(null, file.originalname);
  }
});
const upload = multer({ storage });
const router = express.Router();

router.get('/api/route', (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(500).send('Wrong coordinates');
  const fromO = typeof from === 'string' ? JSON.parse(from) : from;
  const toO = typeof to === 'string' ? JSON.parse(to) : to;

  axios
    .get(
      `http://routes.maps.sputnik.ru/osrm/router/viaroute?loc=${fromO[0]},${
        fromO[1]
      }&loc=${toO[0]},${toO[1]}`
    )
    .then(response => {
      const data = polyline
        .decode(response.data.route_geometry)
        .map(([lat, lon]: [number, number]) => [lat / 10, lon / 10]);
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
  console.log(req.body);
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
    .get(`http://search.maps.sputnik.ru/search`, {
      params: {
        q: search
      }
    })
    .then(response => {
      console.log(response.data);
      const data = response.data.result[0].position;

      res.json([data.lat, data.lon]);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
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

/*
router.get('/api/temp', async (req, res) => {
  await createAdmin();
  res.sendStatus(200);
});*/

export default router;
