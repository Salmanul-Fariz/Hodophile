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

// order Success
router.get(
  '/success/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userOderController.success
);

// order Failed
router.get(
  '/failed/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userOderController.falied
);

// Products Order
router
  .route('/:orderType/:userId/:orderTypeId')
  .get(
    userController.sessionUser,
    userController.checkBlocked,
    userOderController.orderPage
  )
  .post(
    userController.sessionUser,
    userController.checkBlocked,
    userOderController.orderSubmit
  );

// Products Order Add Address
router.post(
  '/address/:userId',
  userController.sessionUser,
  userController.checkBlocked,
  userOderController.addAddress
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
