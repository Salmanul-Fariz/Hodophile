const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyOrderContrller = require('./../../controller/agency/agencyOrderContrller');

// orders page
router.get('/', agencySession, agencyOrderContrller.ordersPage);

// Approved page
router.get('/approved', agencySession, agencyOrderContrller.approvedPage);

// Shipped page
router.get('/shipped', agencySession, agencyOrderContrller.shippedPage);

// Delivered page
router.get('/delivered', agencySession, agencyOrderContrller.deliveryPage);

// Cancelled page
router.get('/cancelled', agencySession, agencyOrderContrller.cancelledPage);

// order Approved
router.post(
  '/approved/:id/:userEmail/:userContact',
  agencySession,
  agencyOrderContrller.approved
);

// order Shipped
router.post(
  '/shipped/:id/:userEmail/:userContact',
  agencySession,
  agencyOrderContrller.shipped
);

// order Delivered
router.post(
  '/delivered/:id/:userEmail/:userContact',
  agencySession,
  agencyOrderContrller.Deliverd
);

// order Cancelled
router.post(
  '/cancelled/:id/:userEmail/:userContact',
  agencySession,
  agencyOrderContrller.cancelled
);

// order Details Page
router.get('/:id', agencySession, agencyOrderContrller.orderDetails);

module.exports = router;
