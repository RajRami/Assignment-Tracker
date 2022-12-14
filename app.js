var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./controllers/index');
const assignmentsRouter = require('./controllers/assignments');
const authRouter = require('./controllers/auth');

const passport = require('passport')
const session = require('express-session')

var app = express();

//DB connection using .env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Passport config for auth
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/userModel')
passport.use(User.createStrategy())

//Let passport read/write user data to/from session variable
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Google auth config
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ oauthId: profile.id }, {
      username: profile.displayName,
      oauthProvider: profile.provider,
      created: Date.now()
    }, (err, user) => {
      // console.log(profile)
      return done(err, user)
    })
  }
))

//Github auth config
const githubStrategy = require('passport-github2').Strategy;

passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ oauthId: profile.id }, {
      username: profile.username,
      oauthProvider: profile.provider,
      created: Date.now()
    }, (err, user) => {
      // console.log(profile)
      return done(err, user)
    })
  }
))

const mongoose = require('mongoose');
const { profile } = require('console');
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('Connected to Database')
}).catch(() => {
  console.log('Cannot Connect to Database')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/assignments', assignmentsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
