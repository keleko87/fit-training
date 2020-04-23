const express = require('express');
const router = express.Router();
const WorkoutGo = require('../models/WorkoutGo');

// GET workout Go LIST
router.get('/all', (req, res) => {
  WorkoutGo.find({})
  .then((data) => {    
    res.json(data);
  })
  .catch(err => console.log(err));
});


router.post('/new', (req, res) => {  

  // WORKOUT DATA
  const { 
    name,
    sport,
    bodyPart,
    level,
    target,
    duration,
    exercises
  } = req.body;

  // WORKOUT GO user and date
  const { userId, startDate, endDate, series, restBetweenExercise, finish } = req.body; 

  let workout = new WorkoutGo({
    name,
    sport,
    bodyPart,
    level,
    target,
    duration,
    exercises,
    userId,
    startDate,
    endDate,
    restBetweenExercise,
    series,
    finish
  });

  console.log('WORKOUT GO: ', workout);
  
  workout.save((err) => {
    if (err) {
      console.log('ERROR:', err);
      const { status, message } = err;
      res.status(status).json(message);
    }
    res.status(201).json('Workout Created!');
  });

});

module.exports = router;
