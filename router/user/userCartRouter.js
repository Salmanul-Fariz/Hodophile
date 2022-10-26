const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userCartController = require('./../../controller/user/userCartController');

// Get Cart Page
router.get(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userCartController.cartsPage
);

// Delete The Products
router.get(
  '/delete/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userCartController.deleteCart
);


// Increase The Quatity
router.get(
  '/increment/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userCartController.increaseQuatity
);

// Decrease The Quatity
router.get(
  '/decrement/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userCartController.decreaseQuatity
);

// Add To Cart
router.post(
  '/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userCartController.addCart
);

module.exports = router;
