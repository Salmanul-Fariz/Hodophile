const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// Require Controller
const userShoppingController = require('./../../controller/user/userShoppingController');
const userOderController = require('./../../controller/user/userOderController');

// Shopping Page
router.get(
  '/',
  userSession,
  userBlockCheck,
  userShoppingController.shoppingPage
);

// order Success
router.get('/success', userSession, userBlockCheck, userOderController.success);

// order Failed
router.get('/failed', userSession, userBlockCheck, userOderController.falied);

// Products Order
router
  .route('/:orderType/:userId/:orderTypeId')
  .get(userSession, userBlockCheck, userOderController.orderPage)
  .post(userSession, userBlockCheck, userOderController.orderSubmit);

// Products Order Add Address
router.post(
  '/address/:userId',
  userSession,
  userBlockCheck,
  userOderController.addAddress
);

// filter Shopping Produc
router.get(
  '/filter/:filter',
  userSession,
  userBlockCheck,
  userShoppingController.filterProducts
);

// Shopping Product Details
router.get(
  '/:id',
  userSession,
  userBlockCheck,
  userShoppingController.shoppingDetailsPage
);

module.exports = router;
