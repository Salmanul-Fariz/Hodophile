const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../controller/agency/agencyController');
const agencyAuthController = require('./../controller/agency/agencyAuthController');
const agencyToursController = require('./../controller/agency/agencyToursController');
const agencyTrekkingController = require('./../controller/agency/agencyTrekkingController');
const agencyUserController = require('./../controller/agency/agencyUserController');

// require Multer
const Multer = require('./../utils/multer');
const trekkingMulter = Multer.trekkingMulter();
const tourMulter = Multer.tourMulter();

// home page
router.get('/', agencyController.sessionAgency, agencyController.homePage);

// login page
router
  .route('/login')
  .get(agencyController.login)
  .post(agencyAuthController.login);

// agency signup post (only for test in postman)
router.post('/signup', agencyAuthController.signup);

//////////////////////////////////
///////////   Tours   ////////////
//////////////////////////////////

// Tours page
router
  .route('/tours')
  .get(agencyController.sessionAgency, agencyToursController.tours)
  .post(tourMulter.array('tourImages', 4), agencyToursController.addPost);

// Tour update page
router.get(
  '/tours/update',
  agencyController.sessionAgency,
  agencyToursController.updateTours
);

// Tour delete page
router.get(
  '/tours/delete',
  agencyController.sessionAgency,
  agencyToursController.deleteTours
);

// Tour add page
router.get(
  '/tours/add',
  agencyController.sessionAgency,
  agencyToursController.add
);

// Tour Page(id)
router.get(
  '/tours/:id',
  agencyController.sessionAgency,
  agencyToursController.tour
);

// Tour update Page(id)
router
  .route('/tours/update/:id')
  .get(agencyController.sessionAgency, agencyToursController.updateTour)
  .post(tourMulter.array('tourImages', 4), agencyToursController.update);

// Tour delete Page(id)
router.post(
  '/tours/delete/:id',
  agencyController.sessionAgency,
  agencyToursController.delete
);

//////////////////////////////////
//////////   Trekkings   /////////
//////////////////////////////////

// Trekking page
router
  .route('/trekkings')
  .get(agencyController.sessionAgency, agencyTrekkingController.trekkings)
  .post(
    trekkingMulter.array('trekkingImages', 4),
    agencyTrekkingController.addPost
  );

// Trekking update page
router.get(
  '/trekkings/update',
  agencyController.sessionAgency,
  agencyTrekkingController.updateTrekkings
);

// Tour delete page
router.get(
  '/trekkings/delete',
  agencyController.sessionAgency,
  agencyTrekkingController.deleteTours
);

// Trekkings add page
router.get(
  '/trekkings/add',
  agencyController.sessionAgency,
  agencyTrekkingController.add
);

// trekking Page(id)
router.get(
  '/trekkings/:id',
  agencyController.sessionAgency,
  agencyTrekkingController.trekking
);

// Trekkings update Page(id)
router
  .route('/trekkings/update/:id')
  .get(agencyController.sessionAgency, agencyTrekkingController.updateTrekking)
  .post(
    trekkingMulter.array('trekkingImages', 4),
    agencyTrekkingController.update
  );

// Trekking delete Page(id)
router.post('/trekkings/delete/:id', agencyTrekkingController.delete);

//////////////////////////////////
////////////   User   ////////////
//////////////////////////////////

// All users
router.get(
  '/users',
  agencyController.sessionAgency,
  agencyUserController.userdetails
);

// To block user
router.post(
  '/users/block/:id',
  agencyController.sessionAgency,
  agencyUserController.userBlock
);

// To unblock user
router.post(
  '/users/unblock/:id',
  agencyController.sessionAgency,
  agencyUserController.userUnblock
);

module.exports = router;
