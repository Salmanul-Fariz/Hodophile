const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userProfileController = require('./../../controller/user/userProfileController');

// profile page
router.get(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.profile
);

// Edit Personal Details
router.post(
  '/update/personal/password/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.updatePersonalDetails
);

// Edit Personal Page
router.get(
  '/update/personal',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.updatePersonalDetailsPage
);

// Personal Details Verification
router.get(
  '/personal/verification',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.personalVerification
);

// personal Details verification
router.post(
  '/personal/verification/:type/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.otpVerification
);

// Edit Personal Page(post)
router.post(
  '/update/personal/:type/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.updatePersonalDetailsPost
);

// Shoppings view Order
router.get(
  '/shoppings/details/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.shoppingOrderview
);

// booking view Order
router.get(
  '/bookings/details/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.bookingsview
);

// Edit profile
router.post(
  '/update/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.updateProfile
);

// avatar Change
router.get(
  '/avatar/:avatarId',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.avatarsUpdate
);

// Shoppings
router.get(
  '/shoppings/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.shopping
);

// Bookings
router.get(
  '/bookings/:id',
  userController.sessionUser,
  userController.checkBlocked,
  userProfileController.booking
);

module.exports = router;
