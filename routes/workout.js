const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET workout LIST
router.get('/all', (req, res) => {
  Workout.find({})
  .then((data) => {    
    res.json(data);
  })
  .catch(err => console.log(err));
});


router.post('/new', (req, res) => {  

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
    exercises,
    musicList
  } = req.body;

  // TO DO Music list API spotify or other
  // const getMusicListType = API.find(musicList)
  
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
    musicList
  });

  console.log('WORKOUT: ', workout);
  
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
