const express = require('express');
const router = express.Router();

// Require Controller
const userController = require('./../../controller/user/userController');
const userShoppingController = require('./../../controller/user/userShoppingController');
const userOderController = require('./../../controller/user/userOderController');

// Shopping Page
router.get(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userShoppingController.shoppingPage
);

// Products Order
router.get(
  '/:userId/:orderType/:orderTypeId',
  userController.sessionUser,
  userController.checkBlocked,
  userOderController.orderPage
);

// filter Shopping Produc
router.get(
  '/filter/:filter',
  userController.sessionUser,
  userController.checkBlocked,
  userShoppingController.filterProducts
);

// Shopping Product Details
router.get(
  '/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userShoppingController.shoppingDetailsPage
);

module.exports = router;
