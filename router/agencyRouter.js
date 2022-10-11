const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../controller/agencyController');
const agencyAuthController = require('./../controller/agencyAuthController');

router.get('/', agencyController.sessionAgency,agencyController.homePage);
router.route('/login').get(agencyController.login).post(agencyAuthController.login)

module.exports = router;
