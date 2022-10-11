const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../controller/userController');
const userAuthController = require('./../controller/userAuthController');

router.route('/').get(userController.homePage);
router
  .route('/signup')
  .get(userController.signup)
  .post(userAuthController.signup);

router.route('/login').get(userController.login).post(userAuthController.login);

module.exports = router;
