const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userCouponController = require('./../../controller/user/userCouponController');

// Booking Coupons
router.post(
  '/',
  userSession,
  userBlockCheck,
  userCouponController.bookingCouponChecking
);

// Order Coupons
router.post(
  '/orders',
  userSession,
  userBlockCheck,
  userCouponController.orderCouponChecking
);

module.exports = router;
