const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');

// Require MiddleWare
const middleware = require('./middleware/middleware');

// set config file
dotenv.config({ path: './config.env' });

// require router
const userRouter = require('./router/userRouter');
const agencyRouter = require('./router/agencyRouter');
const agnecyToursRouter = require('./router/agnecyToursRouter');
const agencyTrekkingRouter = require('./router/agencyTrekkingRouter');


// cache
app.use(middleware.cache);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(
  session({
    secret: process.env.SESSION_KEY_VALUE,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000000000 },
  })
);

// flash
app.use(flash());

// router
app.use('/', userRouter);
app.use('/agency', agencyRouter);
app.use('/agency/tours', agnecyToursRouter);
app.use('/agency/trekkings', agencyTrekkingRouter);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
