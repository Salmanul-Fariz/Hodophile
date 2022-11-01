const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyOrderContrller = require('./../../controller/agency/agencyOrderContrller');

// orders page
router.get(
  '/',
  agencyController.sessionAgency,
  agencyOrderContrller.ordersPage
);

// Approved page
router.get(
  '/approved',
  agencyController.sessionAgency,
  agencyOrderContrller.approvedPage
);

// Shipped page
router.get(
  '/shipped',
  agencyController.sessionAgency,
  agencyOrderContrller.shippedPage
);

// Delivered page
router.get(
  '/delivered',
  agencyController.sessionAgency,
  agencyOrderContrller.deliveryPage
);

// Cancelled page
router.get(
  '/cancelled',
  agencyController.sessionAgency,
  agencyOrderContrller.cancelledPage
);

// order Approved
router.post(
  '/approved/:id/:userEmail/:userContact',
  agencyController.sessionAgency,
  agencyOrderContrller.approved
);

// order Shipped
router.post(
  '/shipped/:id/:userEmail/:userContact',
  agencyController.sessionAgency,
  agencyOrderContrller.shipped
);

// order Delivered
router.post(
  '/delivered/:id/:userEmail/:userContact',
  agencyController.sessionAgency,
  agencyOrderContrller.Deliverd
);

// order Cancelled
router.post(
  '/cancelled/:id/:userEmail/:userContact',
  agencyController.sessionAgency,
  agencyOrderContrller.cancelled
);

// order Details Page
router.get(
  '/:id',
  agencyController.sessionAgency,
  agencyOrderContrller.orderDetails
);

module.exports = router;
