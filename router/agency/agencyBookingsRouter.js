const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyBookingsController = require('./../../controller/agency/agencyBookingsController');

// Bookings page
router.get('/', agencySession, agencyBookingsController.bookingsPage);

// Approved page
router.get('/approved', agencySession, agencyBookingsController.approvedPage);

// Cancelled page
router.get('/cancelled', agencySession, agencyBookingsController.cancelledPage);

// Booking Approved
router.post(
  '/approved/:id/:packageCategory/:userEmail/:userContact',
  agencySession,
  agencyBookingsController.approved
);

// Booking Cancelled
router.post(
  '/cancelled/:id/:packageCategory/:userEmail/:userContact',
  agencySession,
  agencyBookingsController.cancelled
);

// Booking Details Page
router.get('/:id', agencySession, agencyBookingsController.booking);

module.exports = router;
