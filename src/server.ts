import 'module-alias/register';
import express from 'express';
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
// bigint type workaround, otherwise it returns as a string
const pg = require('pg');
pg.types.setTypeParser(20, parseInt);

import publicRouter from './routes/public';
import driverRouter from './routes/app';
import apiRouter from './routes/api';
import adminRouter from './routes/admin';

const app = express();

app.use(cors());
//app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));

app.use(publicRouter);
app.use(driverRouter);
app.use(adminRouter);
app.use(apiRouter);

app.get('*', (req, res) => {
  res.status(404);
  res.end();
});

const server = app.listen(5000, () => console.log('Listening on port 5000!'));
