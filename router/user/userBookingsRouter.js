const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userBookingsController = require('./../../controller/user/userBookingsController');

// Success Booking
router.get(
  '/success',
  userSession,
  userBlockCheck,
  userBookingsController.successPage
);

// Failed Booking
router.get(
  '/failed',
  userSession,
  userBlockCheck,
  userBookingsController.falied
);

// Booking
router.post(
  '/:userId/:packageId/:packageCategory',
  userSession,
  userBlockCheck,
  userBookingsController.bookings
);

module.exports = router;
