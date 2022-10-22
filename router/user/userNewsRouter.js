const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userNewsController = require('./../../controller/user/userNewsController');

// News Page
router.get(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userNewsController.news
);

// News Increment
router.post(
  '/increment/:userId/:newsId',
  userController.sessionUser,
  userController.checkBlocked,
  userNewsController.increment
);

// News Decrement
router.post(
  '/decrement/:userId/:newsId',
  userController.sessionUser,
  userController.checkBlocked,
  userNewsController.decrement
);

module.exports = router;
