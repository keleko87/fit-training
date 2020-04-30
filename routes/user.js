const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');

// HEADERS
router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// ALL
router.get('/all', (req, res) => {
  res.status(200).send('Public Content.');
});

// USER
router.get('/user', [authJwt.verifyToken], (req, res) => {
  res.status(200).send('User Content.');
});

// ADMIN
router.get('/admin', 
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    res.status(200).send('Admin Content.');
  }
);

module.exports = router;
