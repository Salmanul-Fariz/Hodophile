const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userCouponController = require('./../../controller/user/userCouponController');

// Booking Coupons
router.post(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userCouponController.bookingCouponChecking
);

// Order Coupons
router.post(
  '/orders',
  userController.sessionUser,
  userController.checkBlocked,
  userCouponController.orderCouponChecking
);

module.exports = router;
