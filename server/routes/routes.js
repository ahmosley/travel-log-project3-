/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { Router } = require('express');
const MongoStore = require('rate-limit-mongo');

const LogEntry = require('../models/Logentry');
const User = require('../models/User');
const Hobby = require('../models/Hobby');

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

// UpdateLog
router.get('/logentry/:id/edit', (req, res, next) => {
  LogEntry.findById(req.params.id)
    .then((foundLogentry) => {
      res.render('logentry/update-form', foundLogentry);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`error finding logentry by id due to ${err}`);
    });
});

// Delete a log
router.post('/Logentry/:id/delete', (req, res, next) => {
  LogEntry.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/Logentry');
    })
    .catch((err) => {
      console.log(`err deleting drone due to ${err}`);
    });
});

// User Routes

router.get('/user', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(res.locals.user._id)
    .then((user) => {
      res.json(user);
    }).catch(console.error);
});

router.post('/logMeIn', async (req, res) => {
  // Check if user already exists
  let user = await User.findOne({ email: req.body.email });
  // If s/he doesn't exist than create new user
  if (!user) {
    user = await User.create(req.body);
  }
});

// Hobby Routes
router.post('/addAPost', (req, res) => {
  Hobby.create({ message: req.body.message, userId: res.locals.user._id })
    .then((post) => {
      res.json({ post });
    }).catch(console.error);
});


router.get('/getPosts', (req, res) => {
  Hobby.find({}).then((allPostsFromDb) => {
    res.json(allPostsFromDb);
  });
});

router.get('/getMyPosts', (req, res) => {
  Hobby.find({ userId: res.locals.user._id }).then((allPostsFromDb) => {
    res.json(allPostsFromDb);
  });
});


// Edit a hobby
Router.get('/hobby/:id/edit', (req, res, next) => {
  Hobby.findById(req.params.id)
    .then((foundLogentry) => {
      // eslint-disable-next-line no-undef
      res.render('hobby/update-form', foundHobby);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`error finding logentry by id due to ${err}`);
    });
});

// Delete a hobby
router.post('/Hobby/:id/delete', (req, res, next) => {
  LogEntry.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/Hobby');
    })
    .catch((err) => {
      console.log(`err deleting Hobby due to ${err}`);
    });
});



module.exports = router;
