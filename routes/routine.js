const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// GET routine LIST
router.get('/all', (req, res) => {
  Routine.find({})
  .then((data) => {    
    res.json(data);
  })
  .catch(err => console.log(err));
});

router.post('/new', (req, res) => {  

  const { 
    name,
    image,
    target,
    startDate,
    endDate,
    workouts,
    finish,
    creatorRoutineId,
  } = req.body;
  
  let routine = new Routine({
    name,
    image,
    target,
    startDate,
    endDate,
    workouts,
    finish,
    creatorRoutineId
  });

  console.log('ROUTINE: ', routine);
  
  routine.save((err) => {
    if (err) {
      console.log('ERROR:', err);
      const { status, message } = err;
      res.status(status).json(message);
    }
    res.status(201).json('Routine Created!');
  });

});

// Update workout finish into routine
router.put('/update/:id', (req, res) => {  

  // TODO 
  const { 
    name,
    image,
    target,
    startDate,
    endDate,
    workouts,
    finish,
    creatorRoutineId,
  } = req.body;
  
  let routine = new Routine({
    name,
    image,
    target,
    startDate,
    endDate,
    workouts,
    finish,
    creatorRoutineId
  });

  console.log('ROUTINE: ', routine);
  
  routine.findOneAndUpdate(query, {$set: updateData},{new: true}, (err) => {
    if (err) {
      console.log('ERROR:', err);
      const { status, message } = err;
      res.status(status).json(message);
    }
    res.status(200).json('Updated');
  });

});

module.exports = router;
