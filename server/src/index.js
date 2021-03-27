/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const middlewares = require('./middleware');
const logs = require('../api/logs');

const app = express();
app.use(morgan('common'));
app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,

}));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 1300;

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});
