const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../controller/agencyController');
const agencyAuthController = require('./../controller/agencyAuthController');

// home page
router.get('/', agencyController.sessionAgency, agencyController.homePage);

// login page
router
  .route('/login')
  .get(agencyController.login)
  .post(agencyAuthController.login);

// agency signup post (only for test in postman)
router.post('/signup', agencyAuthController.signup);

// Tours page
router
  .route('/tours')
  .get(agencyController.sessionAgency, agencyController.tours)
  .post(agencyController.addPost);

// Tour update page
router.get(
  '/tours/update',
  agencyController.sessionAgency,
  agencyController.updateTours
);

// Tour delete page
router.get(
  '/tours/delete',
  agencyController.sessionAgency,
  agencyController.delete
);

// Tour add page
router.get('/tours/add', agencyController.sessionAgency, agencyController.add);

// Tour Page
router.get('/tours/:id', agencyController.sessionAgency, agencyController.tour);

// Tour update Page
router
  .route('/tours/update/:id')
  .get(agencyController.sessionAgency, agencyController.updateTour)
  .post(agencyController.update);

module.exports = router;
