const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../controller/user/userController');
const userAuthController = require('./../controller/user/userAuthController');
const userToursController = require('./../controller/user/userToursController');
const userTrekkingsController = require('./../controller/user/userTrekkingsController');
const userNewsController = require('./../controller/user/userNewsController');

//  home page
router.route('/').get(userController.homePage);

// signup page
router
  .route('/signup')
  .get(userController.signup)
  .post(userAuthController.signup);

// OTP
router.route('/otp').get(userController.otp).post(userAuthController.otp);

// OTP Resent
router.get('/otp/resend', userAuthController.resend);

// login page
router.route('/login').get(userController.login).post(userAuthController.login);

// Logout
router.post('/logout', userController.logout);

// profile page
router.get(
  '/profile',
  userController.sessionUser,
  userController.checkBlocked,
  userController.profile
);

//////////////////////////////////
///////////   Tours   ////////////
//////////////////////////////////

// Tours page
router.get('/tours', userToursController.tours);

// Tours details page
router.get(
  '/tours/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userToursController.details
);

//////////////////////////////////
//////////   Trekkings   /////////
//////////////////////////////////

// Trekkings page
router.get('/trekkings', userTrekkingsController.trekkings);

// Trekkings details page
router.get(
  '/trekkings/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userTrekkingsController.details
);

//////////////////////////////////
////////////   News   ////////////
//////////////////////////////////

// News Page
router.get(
  '/news',
  userController.sessionUser,
  userController.checkBlocked,
  userNewsController.news
);

// News Increment
router.post(
  '/news/increment/:userId/:newsId',
  userController.sessionUser,
  userController.checkBlocked,
  userNewsController.increment
);

// News Decrement
router.post(
  '/news/decrement/:userId/:newsId',
  userController.sessionUser,
  userController.checkBlocked,
  userNewsController.decrement
);

module.exports = router;
