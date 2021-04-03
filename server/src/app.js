const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const middlewares = require('./middlewares');
const app = express();
app.use(morgan('common'));
app.use(helmet());
const path = require('path')

app.use(cors({
    origin: 'https://localhost:3000',
  
  }));

  
  app.get('/', (req, res) => {
      res.json({
          message: 'Hello World!',
        });
    });
    
    app.use(middlewares.NotFound)
    
    app.use(middlewares.ErrorHandler); 

    app.use(express.json())


//Static files for our backend 
app.use(express.static(path.join(__dirname, '../frontend/build')))


//Our connection to the frontend >>> All our routes for now
app.use(`/api`, require('./routes/routes'))


//Sends our one single page on all requests 
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

       
        const PORT= process.env.PORT || 5000
        app.listen(PORT, () => console.log(`Listening to port ${PORT}`))