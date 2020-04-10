const express = require('express');
const router = express.Router();
const Routine = require('../models/Exercise');

/* GET home page. */
router.get('/', (req, res, next) => {
  // Exercise.find({}).exec()
  //   .then((exercises) => {
  //     let user;
  //     if (req.user) user = req.user;
  //     res.render('index', {
  //       title: 'Fit Training',
  //       exercises: exercises,
  //       user: user || 'Fit Training'
  //     });
  //   })
  //   .catch( err => console.log(err));
});

module.exports = router;
