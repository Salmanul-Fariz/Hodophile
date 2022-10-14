const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');

// require router
const agencyRouter = require('./router/agencyRouter');
const userRouter = require('./router/userRouter');

// set multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/destination');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '.jpg';
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// use multer
app.use(upload.array('tourImages', 4), function (req, res, next) {
  next();
});

// cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(
  session({
    secret: 'key',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000000000 },
  })
);

// flash
app.use(flash());

// router
app.use('/agency', agencyRouter);
app.use('/', userRouter);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
