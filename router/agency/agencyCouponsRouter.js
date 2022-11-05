const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyCouponsController = require('./../../controller/agency/agencyCouponsController');

// View Coupons
router.get('/', agencySession, agencyCouponsController.coupenPage);

// Add Coupons page
router
  .route('/add')
  .get(agencySession, agencyCouponsController.addCouponPage)
  .post(agencySession, agencyCouponsController.addCoupon);

// Delete Coupons
router.get('/delete/:id', agencySession, agencyCouponsController.deleteCoupon);

module.exports = router;
