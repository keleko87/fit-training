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

// if (process.env.NODE_ENV === 'production') {
//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(__dirname, '../public/uploads'))
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
//     }
//   })
// } else {
//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(__dirname, 'uploads'))
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
//     }
//   })
// }

// const uploads = multer({ storage: storage });

// app.use(uploads.any());
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.resolve(__dirname, 'build')));
// } else {
//   app.use(express.static('./public'));
// }

const storageImage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    console.log(`DIR__NAME______`, path.resolve(__dirname, '../public/uploads'));
    console.log(`PATH JOIN`, path.join(__dirname, 'public/uploads'));

    // const destinationPath = path.resolve(__dirname, '../public/uploads');
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    // const image = req.body.image;
    // const imageUrl = image.split(`blob:${process.env.APP_WEB}`);
    console.log('FILE NAME: ', file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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
