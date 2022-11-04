const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyUserController = require('./../../controller/agency/agencyUserController');

// require Multer
const Multer = require('../../utils/multer');
const avatarMulter = Multer.avatarMulter();

// All users
router.get(
  '/',
  agencyController.sessionAgency,
  agencyUserController.userdetails
);

// Avatar Page
router.post(
  '/avatar',
  agencyController.sessionAgency,
  avatarMulter.single('avatarImage'),
  agencyUserController.addAvatars
);

// To block user
router.post(
  '/block/:id',
  agencyController.sessionAgency,
  agencyUserController.userBlock
);

// To unblock user
router.post(
  '/unblock/:id',
  agencyController.sessionAgency,
  agencyUserController.userUnblock
);

module.exports = router;
