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

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/travel-log', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to ${x.connections[0].name}`))
  .catch(() => console.error('Error connecting to Mongo'));

app.use('/api/logs', logs);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1300;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
