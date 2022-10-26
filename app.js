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

// require User router
const userRouter = require('./router/user/userRouter');
const userShoppingRouter = require('./router/user/userShoppingsRouter');
const userTourRouter = require('./router/user/userTourRouter');
const userTrekkingsRouter = require('./router/user/userTrekkingsRouter');
const userNewsRouter = require('./router/user/userNewsRouter');
const userCartRouter = require('./router/user/userCartRouter');
const userWishlistRouter = require('./router/user/userWishlistRouter');

// require User router
const agencyRouter = require('./router/agency/agencyRouter');
const agnecyToursRouter = require('./router/agency/agnecyToursRouter');
const agencyTrekkingRouter = require('./router/agency/agencyTrekkingRouter');
const agencyShoppingsRouter = require('./router/agency/agencyShoppingsRouter');
const agencyNewsRouter = require('./router/agency/agencyNewsRouter');
const agencyUserRouter = require('./router/agency/agencyUserRouter');


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

// User Router
app.use('/', userRouter);
app.use('/shoppings/wishlists', userWishlistRouter);
app.use('/shoppings/carts', userCartRouter);
app.use('/shoppings', userShoppingRouter);
app.use('/tours', userTourRouter);
app.use('/trekkings', userTrekkingsRouter);
app.use('/news', userNewsRouter);

// User Router
app.use('/agency', agencyRouter);
app.use('/agency/tours', agnecyToursRouter);
app.use('/agency/trekkings', agencyTrekkingRouter);
app.use('/agency/shoppings', agencyShoppingsRouter);
app.use('/agency/news', agencyNewsRouter);
app.use('/agency/users', agencyUserRouter);


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
