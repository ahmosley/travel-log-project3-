/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middleware');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors());
const port = process.env.PORT || 1300;

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
