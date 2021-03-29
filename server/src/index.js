/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const middlewares = require('./middleware');
const logs = require('../routes/routes');

const app = express();
app.use(morgan('common'));
app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,

}));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/travel-log', { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to ${x.connections[0].name}`))
  .catch(() => console.error('Error connecting to Mongo'));

const port = process.env.PORT || 1300;

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
