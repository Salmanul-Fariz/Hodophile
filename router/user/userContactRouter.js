const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userContactController = require('./../../controller/user/userContactController');

// Get Cart Page
router.get('/', userContactController.contactPage);

module.exports = router;
