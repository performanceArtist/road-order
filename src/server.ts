//import 'module-alias/register';
import * as express from 'express';
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

import mainRouter from './routes/public';

const app = express();

app.use(cors());
//app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));

// public routes
app.use(mainRouter);
app.get('*', (req, res) => {
  res.status(404);
  res.end();
});

const server = app.listen(5000, () => console.log('Listening on port 5000!'));
