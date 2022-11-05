const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyUserController = require('./../../controller/agency/agencyUserController');

// require Multer
const Multer = require('../../middleware/multer');
const avatarMulter = Multer.avatarMulter();

// All users
router.get('/', agencySession, agencyUserController.userdetails);

// Avatar Page
router.post(
  '/avatar',
  agencySession,
  avatarMulter.single('avatarImage'),
  agencyUserController.addAvatars
);

// To block user
router.post('/block/:id', agencySession, agencyUserController.userBlock);

// To unblock user
router.post('/unblock/:id', agencySession, agencyUserController.userUnblock);

module.exports = router;
