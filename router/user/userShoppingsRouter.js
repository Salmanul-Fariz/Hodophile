const express = require('express');
const router = express.Router();

// Require Controller
const userController = require('./../../controller/user/userController');
const userShoppingController = require('./../../controller/user/userShoppingController');

// Shopping Page
router.get(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userShoppingController.shoppingPage
);

// Shopping Product Details
router.get(
  '/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userShoppingController.shoppingDetailsPage
);

module.exports = router;
