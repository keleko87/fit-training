const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Exercise = require('../models/Exercise');

// GET exercise LIST
router.get('/all', (req, res) => {
  Exercise.find({})
  .then((data) => {    
    res.json(data);
  })
  .catch(err => console.log(err));
});

const storageImage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    console.log(`DIR__NAME______`, path.resolve(__dirname, '../public/uploads'));
    const destinationPath = path.resolve(__dirname, '../public/uploads');
    callback(null, destinationPath);
  },
  filename: function (req, file, callback) {
    // const image = req.body.image;
    // const imageUrl = image.split(`blob:${process.env.APP_WEB}`);
    const datetimestamp = Date.now();
    const fileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
    callback(null, fileName);
  }
});

const uploadImage = multer({ storage: storageImage }).single('image');

router.post('/new', (req, res) => {
  uploadImage(req, res, (err) => {
  
    if(err) {
      return res.status(601).json(err);
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
      // imageUrl = req.body.imageUrl.replace(`blob:${process.env.APP_WEB}`, '');
  
    } else if (!req.file){
      image = { filename: 'nofile' };
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

    console.log('EXERCISE', exercise);
    
    exercise.save((err) => {
      if (err) {
        console.log('ERROR:', err);
        const { status, message } = err;
        res.status(status).json(message);
      }
      res.status(201).json('Created ok!');
    });
    
  });
});

module.exports = router;
