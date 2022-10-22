const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyToursController = require('./../../controller/agency/agencyToursController');

// require Multer
const Multer = require('./../../utils/multer');
const tourMulter = Multer.tourMulter();

// Tours page
router
  .route('/')
  .get(agencyController.sessionAgency, agencyToursController.tours)
  .post(
    agencyController.sessionAgency,
    tourMulter.array('tourImages', 4),
    agencyToursController.addPost
  );

// Tour update page
router.get(
  '/update',
  agencyController.sessionAgency,
  agencyToursController.updateTours
);

// Tour delete page
router.get(
  '/delete',
  agencyController.sessionAgency,
  agencyToursController.deleteTours
);

// Tour add page
router.get('/add', agencyController.sessionAgency, agencyToursController.add);

// Tour Page(id)
router.get('/:id', agencyController.sessionAgency, agencyToursController.tour);

// Tour update Page(id)
router
  .route('/update/:id')
  .get(agencyController.sessionAgency, agencyToursController.updateTour)
  .post(
    agencyController.sessionAgency,
    tourMulter.array('tourImages', 4),
    agencyToursController.update
  );

// Tour delete Page(id)
router.post(
  '/delete/:id',
  agencyController.sessionAgency,
  agencyToursController.delete
);

module.exports = router;
