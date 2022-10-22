const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyUserController = require('./../../controller/agency/agencyUserController');

// All users
router.get(
  '/',
  agencyController.sessionAgency,
  agencyUserController.userdetails
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
