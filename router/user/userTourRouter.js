const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userToursController = require('./../../controller/user/userToursController');

// Tours page
router.get('/', userToursController.tours);

// Tours details page
router.get('/:id', userSession, userBlockCheck, userToursController.details);

module.exports = router;
