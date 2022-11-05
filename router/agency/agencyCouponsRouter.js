const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyCouponsController = require('./../../controller/agency/agencyCouponsController');

// View Coupons
router.get(
  '/',
  agencyController.sessionAgency,
  agencyCouponsController.coupenPage
);

// Add Coupons page
router
  .route('/add')
  .get(agencyController.sessionAgency, agencyCouponsController.addCouponPage)
  .post(agencyController.sessionAgency, agencyCouponsController.addCoupon);

// Delete Coupons
router.get(
  '/delete/:id',
  agencyController.sessionAgency,
  agencyCouponsController.deleteCoupon
);

module.exports = router;
