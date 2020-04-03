require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const debug = require('debug')(`fit-training:${path.basename(__filename).split('.')[0]}`);
const cors = require('cors');

// Connect to mongo database
const dburl = process.env.MONGO_DB_URL;
console.log(`fit-training:${path.basename(__filename).split('.')[0]}`,'connecting....', dburl);

debug(`Connecting to ${dburl}`);
mongoose.Promise = global.Promise;
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// Init server
const app = express();

// CORS
app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const exercise = require('./routes/exercise');
app.use('/api/exercise', exercise);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.use((req, res, next) => {
    res.sendfile(__dirname + '/public/index.html');
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
