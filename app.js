require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const debug = require('debug')(`fit-training:${path.basename(__filename).split('.')[0]}`);
const cors = require('cors');

const db = require("./models");
const Role = db.role;

// Connect to mongo database
const dburl = process.env.MONGO_DB_URL;
console.log(`fit-training:${path.basename(__filename).split('.')[0]}`,'connecting....', dburl);

debug(`Connecting to ${dburl}`);
mongoose.Promise = global.Promise;
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Init server
const app = express();

// CORS
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
// app.use(cors());
// app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'Fit Training Express Server';

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const auth = require('./routes/auth');
const user = require('./routes/user');
const exercise = require('./routes/exercise');
const workout = require('./routes/workout');
const workoutGo = require('./routes/workoutGo');
app.use('/api/auth', auth);
app.use('/api/test', user);
app.use('/api/exercise', exercise);
app.use('/api/workout', workout);
app.use('/api/workoutGo', workoutGo);


if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // app.use((req, res, next) => {
  //   res.sendfile(__dirname + '/public/index.html');
  // });

  // HANDLE SPA Vue
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
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
