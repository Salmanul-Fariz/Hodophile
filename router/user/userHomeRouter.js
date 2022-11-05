const express = require('express');
const router = express.Router();

// require controller
const userHomeController = require('../../controller/user/userHomeController');
const userAuthController = require('../../controller/user/userAuthController');

//  home page
router.route('/').get(userHomeController.homePage);

// signup page
router
  .route('/signup')
  .get(userAuthController.signupPage)
  .post(userAuthController.signup);

// OTP
router
  .route('/otp')
  .get(userAuthController.otpPage)
  .post(userAuthController.otp);

// OTP Resent
router.get('/otp/resend', userAuthController.resend);

// login page
router
  .route('/login')
  .get(userAuthController.loginPage)
  .post(userAuthController.login);

// Logout
router.post('/logout', userAuthController.logout);

module.exports = router;
