import * as express from 'express';
import axios from 'axios';
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
  const fromO = JSON.parse(from);
  const toO = JSON.parse(to);

  axios
    .get(
      `http://routes.maps.sputnik.ru/osrm/router/viaroute?loc=${fromO[0]},${
        fromO[1]
      }&loc=${toO[0]},${toO[1]}`
    )
    .then(response => {
      const data = polyline
        .decode(response.data.route_geometry)
        .map(([lat, lon]) => [lat / 10, lon / 10]);
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

export default router;
