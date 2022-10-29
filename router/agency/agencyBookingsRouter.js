const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyBookingsController = require('./../../controller/agency/agencyBookingsController');

// Bookings page
router.get(
  '/',
  agencyController.sessionAgency,
  agencyBookingsController.bookingsPage
);

// Approved page
router.get(
  '/approved',
  agencyController.sessionAgency,
  agencyBookingsController.approvedPage
);

// Cancelled page
router.get(
  '/cancelled',
  agencyController.sessionAgency,
  agencyBookingsController.cancelledPage
);

// Booking Approved
router.post(
  '/approved/:id/:packageCategory/:userEmail/:userContact',
  agencyController.sessionAgency,
  agencyBookingsController.approved
);

// Booking Approved
router.post(
  '/cancelled/:id/:packageCategory/:userEmail/:userContact',
  agencyController.sessionAgency,
  agencyBookingsController.cancelled
);

// Booking Details Page
router.get(
  '/:id',
  agencyController.sessionAgency,
  agencyBookingsController.booking
);

module.exports = router;
