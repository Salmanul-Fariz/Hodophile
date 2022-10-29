const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userToursController = require('./../../controller/user/userToursController');
const userBookingsController = require('./../../controller/user/userBookingsController');

// Tours page
router.get('/', userToursController.tours);

// Tour Booking
router.post(
  '/bookings/:userId/:packageId/:packageCategory',
  userController.sessionUser,
  userController.checkBlocked,
  userBookingsController.bookings
);

// Tours details page
router.get(
  '/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userToursController.details
);

module.exports = router;
