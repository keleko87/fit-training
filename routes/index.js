const express = require('express');
const router = express.Router();

/* GET home page. */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

module.exports = router;
