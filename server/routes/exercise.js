const express = require('express');
const router = express.Router();
const multer = require('multer');
const Exercise = require('../models/Exercise');
const upload = multer ({dest: './public/uploads'});

// GET exercise LIST
router.get('/all', (req, res) => {
  Exercise.find({})
  .then((data) => {    
    res.json(data);
  })
  .catch(err => console.log(err));
});

var storagePhoto	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    const image = req.body.imageUrl;
    const imageUrl = image.split(`blob:${process.env.APP_WEB}`)
    callback(null, imageUrl[1]);
  }
});

var uploadPhoto = multer({ storage : storagePhoto }).single('photo');

router.post('/new', (req, res) => {
  uploadPhoto(req, res, (err) => {
  
    if(err) {
      return res.end("Error uploading file!");
    }
  
    let image;
    let imageUrl = req.body.imageUrl || '';
    const { 
      name,
      sport,
      bodyPart,
      level,
      target,
      moveType,
      description,
      time,
      rest,
      series,
      reps,
      videoUrl,
      isWarmUp,
      observations
    } = req.body;

    if (req.file && imageUrl) {
      image = req.file;
      imageUrl = req.body.imageUrl.replace(`blob:${process.env.APP_WEB}`, '');
    } else {
      image = { filename: 'nofile' };
      imageUrl = '';
    }
  
    let exercise = new Exercise({
      name,
      sport,
      bodyPart,
      level,
      target,
      moveType,
      description,
      time, // seconds
      rest, // seconds
      series,
      reps,
      image,
      imageUrl,
      videoUrl,
      isWarmUp,
      observations
    });

    console.log('EXERCISE:::::::', exercise);
    
    exercise.save((err, exercise) => {
      if (err) {
        console.log('errorrrrr', err);
        const { status } = err;
        if (status >= 100 && status < 600) res.status(status);
        else res.status(500);
      }
      res.status(201).json('Created ok!');
    });
    
  });
});

module.exports = router;
