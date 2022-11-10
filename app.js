const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');

// Require MiddleWare
const cache = require('./middleware/cache');
const appError = require('./middleware/appError');

// set config file
dotenv.config({ path: './config.env' });

// require User router
const userRouter = require('./router/user/userHomeRouter');
const userShoppingRouter = require('./router/user/userShoppingsRouter');
const userTourRouter = require('./router/user/userTourRouter');
const userTrekkingsRouter = require('./router/user/userTrekkingsRouter');
const userNewsRouter = require('./router/user/userNewsRouter');
const userCartRouter = require('./router/user/userCartRouter');
const userWishlistRouter = require('./router/user/userWishlistRouter');
const userBookingsRouter = require('./router/user/userBookingsRouter');
const userProfileRouter = require('./router/user/userProfileRouter');
const userCouponsRouter = require('./router/user/userCouponsRouter');
const userContactRouter = require('./router/user/userContactRouter');

// require agency router
const agencyRouter = require('./router/agency/agencyDashboardRouter');
const agnecyToursRouter = require('./router/agency/agnecyToursRouter');
const agencyTrekkingRouter = require('./router/agency/agencyTrekkingRouter');
const agencyShoppingsRouter = require('./router/agency/agencyShoppingsRouter');
const agencyNewsRouter = require('./router/agency/agencyNewsRouter');
const agencyUserRouter = require('./router/agency/agencyUserRouter');
const agencyBookingsRouter = require('./router/agency/agencyBookingsRouter');
const agencyOrderRouter = require('./router/agency/agencyOrderRouter');
const agencyCouponsRouter = require('./router/agency/agencyCouponsRouter');

// cache
app.use(cache);

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
app.use('/profile', userProfileRouter);
app.use('/trekkings', userTrekkingsRouter);
app.use('/news', userNewsRouter);
app.use('/bookings', userBookingsRouter);
app.use('/coupons', userCouponsRouter);
app.use('/contact', userContactRouter);

// Agency Router
app.use('/agency', agencyRouter);
app.use('/agency/tours', agnecyToursRouter);
app.use('/agency/trekkings', agencyTrekkingRouter);
app.use('/agency/shoppings', agencyShoppingsRouter);
app.use('/agency/news', agencyNewsRouter);
app.use('/agency/users', agencyUserRouter);
app.use('/agency/bookings', agencyBookingsRouter);
app.use('/agency/orders', agencyOrderRouter);
app.use('/agency/coupons', agencyCouponsRouter);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle Undifined Routes
app.all('*', (req, res, next) => {
  appError(req, res, next);
});

module.exports = app;
