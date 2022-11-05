const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userCartController = require('./../../controller/user/userCartController');

// Get Cart Page
router.get('/', userSession, userBlockCheck, userCartController.cartsPage);

// Delete The Products
router.get(
  '/delete/:userId/:productId',
  userSession,
  userBlockCheck,
  userCartController.deleteCart
);

// Increase The Quatity
router.get(
  '/increment/:userId/:productId',
  userSession,
  userBlockCheck,
  userCartController.increaseQuatity
);

// Decrease The Quatity
router.get(
  '/decrement/:userId/:productId',
  userSession,
  userBlockCheck,
  userCartController.decreaseQuatity
);

// Add To Cart
router.post(
  '/:userId/:productId',
  userSession,
  userBlockCheck,
  userCartController.addCart
);

module.exports = router;
