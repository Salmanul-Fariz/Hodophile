const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userProfileController = require('./../../controller/user/userProfileController');

// profile page
router.get('/', userSession, userBlockCheck, userProfileController.profile);

// Edit Personal Details
router.post(
  '/update/personal/password/:id',
  userSession,
  userBlockCheck,
  userProfileController.updatePersonalDetails
);

// Edit Personal Page
router.get(
  '/update/personal',
  userSession,
  userBlockCheck,
  userProfileController.updatePersonalDetailsPage
);

// Personal Details Verification
router.get(
  '/personal/verification',
  userSession,
  userBlockCheck,
  userProfileController.personalVerification
);

// Shoppings address Update
router
  .route('/shoppings/address/:adddressIndex/:id')
  .get(userSession, userBlockCheck, userProfileController.updateAddressPage)
  .post(userSession, userBlockCheck, userProfileController.updateAddress);

// Shoppings address Delete
router.get(
  '/shoppings/address/remove/:adddressIndex/:id',
  userSession,
  userBlockCheck,
  userProfileController.removeAddress
);

// personal Details verification
router.post(
  '/personal/verification/:type/:id',
  userSession,
  userBlockCheck,
  userProfileController.otpVerification
);

// Edit Personal Page(post)
router.post(
  '/update/personal/:type/:id',
  userSession,
  userBlockCheck,
  userProfileController.updatePersonalDetailsPost
);

// Shoppings view Order
router.get(
  '/shoppings/details/:id',
  userSession,
  userBlockCheck,
  userProfileController.shoppingOrderview
);

// booking view Order
router.get(
  '/bookings/details/:id',
  userSession,
  userBlockCheck,
  userProfileController.bookingsview
);

// Edit profile
router.post(
  '/update/:id',
  userSession,
  userBlockCheck,
  userProfileController.updateProfile
);

// avatar Change
router.get(
  '/avatar/:avatarId',
  userSession,
  userBlockCheck,
  userProfileController.avatarsUpdate
);

// Shoppings
router.get(
  '/shoppings/:id',
  userSession,
  userBlockCheck,
  userProfileController.shopping
);

// Bookings
router.get(
  '/bookings/:id',
  userSession,
  userBlockCheck,
  userProfileController.booking
);

module.exports = router;
