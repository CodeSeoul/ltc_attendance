const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configDB = require('./config/database.js')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const index = require('./routes/index');
const users = require('./routes/users');
const courses = require('./routes/courses');
const app = express();

// database
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('debug', true)

mongoose.connect(configDB.MONGO_DEV, err => {
  if (err) {
    console.log("# Failed to connect to MongoDB Dev:");
  } else {
    console.log('# Connected to MongoDB Dev:')
  }
});

// mongoose.connect(configDB.MONGODB_URI, err => {
//   if (err) {
//     console.log("# Failed to connect to MongoDB :", configDB.MONGODB_URI);
//   } else {
//     console.log('# Connected to MongoDB :', configDB.MONGODB_URI)
//   }
// })

// require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/courses', courses);

// required for passport
app.use(session({ secret: 'thisneedstobehidden' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
