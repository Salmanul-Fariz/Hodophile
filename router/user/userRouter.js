const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userAuthController = require('./../../controller/user/userAuthController');

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

module.exports = router;
