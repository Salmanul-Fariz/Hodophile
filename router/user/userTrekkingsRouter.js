const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userTrekkingsController = require('./../../controller/user/userTrekkingsController');

// Trekkings page
router.get('/', userTrekkingsController.trekkings);

// Trekkings details page
router.get(
  '/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userTrekkingsController.details
);

module.exports = router;
