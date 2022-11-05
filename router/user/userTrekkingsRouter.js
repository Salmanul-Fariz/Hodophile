const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userTrekkingsController = require('./../../controller/user/userTrekkingsController');

// Trekkings page
router.get('/', userTrekkingsController.trekkings);

// Trekkings details page
router.get(
  '/:id',
  userSession,
  userBlockCheck,
  userTrekkingsController.details
);

module.exports = router;
