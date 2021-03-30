/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { Router } = require('express');
const mongoose = require('mongoose');
const MongoStore = require('rate-limit-mongo');

const LogEntry = require('../models/Logentry');


const router = Router();

// logentry routes
router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('-----> ', req.body);
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// Grab a specific log

router.get('/logentries/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // we can use .populate() method to get the whole task objects
  LogEntry.findById(req.params.id)
    .populate('tasks')
    // eslint-disable-next-line arrow-parens
    .then(LogEntry => {
      res.status(200).json(LogEntry);
    })
    .catch((error) => {
      res.json(error);
    });
});

// UpdateLog
router.put('/logentries/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  LogEntry.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Log Entry with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

// // Delete a log
router.delete('/logentries/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  LogEntry.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Log entry with ${req.params.id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

// User Routes

// router.get('/user', (req, res) => {
// eslint-disable-next-line no-underscore-dangle
// User.findById(res.locals.user._id)
// .then((user) => {
//       res.json(user);
//     }).catch(console.error);
// });

// router.post('/logMeIn', async (req, res) => {
//   // Check if user already exists
//   let user = await User.findOne({ email: req.body.email });
//   // If s/he doesn't exist than create new user
//   if (!user) {
//     user = await User.create(req.body);
//   }
// });

module.exports = router;
