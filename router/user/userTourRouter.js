const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userToursController = require('./../../controller/user/userToursController');

// Tours page
router.get('/', userToursController.tours);

// Tours details page
router.get(
  '/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userToursController.details
);

module.exports = router;
