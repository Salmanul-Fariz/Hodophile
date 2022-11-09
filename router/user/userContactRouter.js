const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userContactController = require('./../../controller/user/userContactController');

// Get Cart Page
router.get('/', userSession, userBlockCheck, userContactController.contactPage);

// Send mail To Admin
router.post('/send', userSession, userBlockCheck, userContactController.contact);

module.exports = router;
