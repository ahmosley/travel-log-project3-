/* eslint-disable spaced-comment */
/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const middlewares = require('./middleware');

require('../configs/passport');
const logs = require('../api/logs');
const Users = require('../models/User');

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

//This is to use the log model and routes
app.use('/api/logs', logs);
app.use('/api/users', Users);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// This is to use the User model and routes
app.use(session({
  secret: 'some secret goes here',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
