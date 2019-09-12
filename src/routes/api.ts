import * as express from 'express';
import axios from 'axios';
const polyline = require('@mapbox/polyline');

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
export default router;
