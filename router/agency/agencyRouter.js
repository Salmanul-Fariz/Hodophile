const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyAuthController = require('./../../controller/agency/agencyAuthController');

// home page
router.get('/', agencyController.sessionAgency, agencyController.homePage);

// login page
router
  .route('/login')
  .get(agencyController.login)
  .post(agencyAuthController.login);

// agency signup post (only for test in postman)
router.post('/signup', agencyAuthController.signup);

module.exports = router;
