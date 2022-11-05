const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userNewsController = require('./../../controller/user/userNewsController');

// News Page
router.get('/', userSession, userBlockCheck, userNewsController.news);

// News Increment
router.get(
  '/increment/:userId/:newsId',
  userSession,
  userBlockCheck,
  userNewsController.increment
);

// News Decrement
router.get(
  '/decrement/:userId/:newsId',
  userSession,
  userBlockCheck,
  userNewsController.decrement
);

module.exports = router;
