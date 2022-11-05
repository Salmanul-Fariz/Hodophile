const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyTrekkingController = require('./../../controller/agency/agencyTrekkingController');

// require Multer
const Multer = require('./../../middleware/multer');
const trekkingMulter = Multer.trekkingMulter();

// Trekking page
router
  .route('/')
  .get(agencySession, agencyTrekkingController.trekkings)
  .post(
    agencySession,
    trekkingMulter.array('trekkingImages', 4),
    agencyTrekkingController.addPost
  );

// Trekking update page
router.get('/update', agencySession, agencyTrekkingController.updateTrekkings);

// Tour delete page
router.get('/delete', agencySession, agencyTrekkingController.deleteTours);

// Trekkings add page
router.get('/add', agencySession, agencyTrekkingController.add);

// trekking Page(id)
router.get('/:id', agencySession, agencyTrekkingController.trekking);

// Trekkings update Page(id)
router
  .route('/update/:id')
  .get(agencySession, agencyTrekkingController.updateTrekking)
  .post(
    agencySession,
    trekkingMulter.array('trekkingImages', 4),
    agencyTrekkingController.update
  );

// Trekking delete Page(id)
router.post('/delete/:id', agencySession, agencyTrekkingController.delete);

module.exports = router;
