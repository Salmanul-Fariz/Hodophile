const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('../../middleware/agencySession');

// require controller
const agencyDashboardController = require('./../../controller/agency/agencyDashboardController');
const agencyAuthController = require('../../controller/agency/agencyAuthController');

// home page
router.get('/', agencySession, agencyDashboardController.dashboardPage);

// Take Data To Graph
router.get('/data', agencySession, agencyDashboardController.graph);

// login page
router
  .route('/login')
  .get(agencyDashboardController.login)
  .post(agencyAuthController.login);

// agency signup post (only for test in postman)
router.post('/signup', agencyAuthController.signup);

module.exports = router;
