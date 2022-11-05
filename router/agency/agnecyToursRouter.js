const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyToursController = require('./../../controller/agency/agencyToursController');

// require Multer
const Multer = require('./../../middleware/multer');
const tourMulter = Multer.tourMulter();

// Tours page
router
  .route('/')
  .get(agencySession, agencyToursController.tours)
  .post(
    agencySession,
    tourMulter.array('tourImages', 4),
    agencyToursController.addPost
  );

// Tour update page
router.get('/update', agencySession, agencyToursController.updateTours);

// Tour delete page
router.get('/delete', agencySession, agencyToursController.deleteTours);

// Tour add page
router.get('/add', agencySession, agencyToursController.add);

// Tour Page(id)
router.get('/:id', agencySession, agencyToursController.tour);

// Tour update Page(id)
router
  .route('/update/:id')
  .get(agencySession, agencyToursController.updateTour)
  .post(
    agencySession,
    tourMulter.array('tourImages', 4),
    agencyToursController.update
  );

// Tour delete Page(id)
router.post('/delete/:id', agencySession, agencyToursController.delete);

module.exports = router;
