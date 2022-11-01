const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userBookingsController = require('./../../controller/user/userBookingsController');

// Success Booking
router.get(
  '/success/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userBookingsController.successPage
);

// Failed Booking
router.get(
  '/failed/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userBookingsController.falied
);

// Booking
router.post(
  '/:userId/:packageId/:packageCategory',
  userController.sessionUser,
  userController.checkBlocked,
  userBookingsController.bookings
);

module.exports = router;
