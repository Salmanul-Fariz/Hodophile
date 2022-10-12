const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../controller/userController');
const userAuthController = require('./../controller/userAuthController');

//  home page
router.route('/').get(userController.homePage);

// signup page
router
  .route('/signup')
  .get(userController.signup)
  .post(userAuthController.signup);

  // otp
  router.route('/otp').get(userController.otp).post(userAuthController.otp)
// login page
router.route('/login').get(userController.login).post(userAuthController.login);

module.exports = router;
