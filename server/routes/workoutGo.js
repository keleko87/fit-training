const express = require('express');
const router = express.Router();
const WorkoutGo = require('../models/WorkoutGo');

// GET workout Go LIST
router.get('/all', (req, res) => {
  Workout.find({})
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
    sportImageUrl,
    bodyPart,
    level,
    target,
    duration,
    restBetweenExercise,
    creatorWorkoutId,
    exercises
  } = req.body;

  // WORKOUT GO user and date
  const { userId, startDate, endDate } = req.body; 

  let workout = new Workout({
    name,
    sport,
    sportImageUrl,
    bodyPart,
    level,
    target,
    duration,
    restBetweenExercise,
    creatorWorkoutId,
    exercises,
    userId,
    startDate,
    endDate
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
