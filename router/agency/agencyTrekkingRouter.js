const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyTrekkingController = require('./../../controller/agency/agencyTrekkingController');

// require Multer
const Multer = require('./../../utils/multer');
const trekkingMulter = Multer.trekkingMulter();

// Trekking page
router
  .route('/')
  .get(agencyController.sessionAgency, agencyTrekkingController.trekkings)
  .post(
    agencyController.sessionAgency,
    trekkingMulter.array('trekkingImages', 4),
    agencyTrekkingController.addPost
  );

// Trekking update page
router.get(
  '/update',
  agencyController.sessionAgency,
  agencyTrekkingController.updateTrekkings
);

// Tour delete page
router.get(
  '/delete',
  agencyController.sessionAgency,
  agencyTrekkingController.deleteTours
);

// Trekkings add page
router.get(
  '/add',
  agencyController.sessionAgency,
  agencyTrekkingController.add
);

// trekking Page(id)
router.get(
  '/:id',
  agencyController.sessionAgency,
  agencyTrekkingController.trekking
);

// Trekkings update Page(id)
router
  .route('/update/:id')
  .get(agencyController.sessionAgency, agencyTrekkingController.updateTrekking)
  .post(
    agencyController.sessionAgency,
    trekkingMulter.array('trekkingImages', 4),
    agencyTrekkingController.update
  );

// Trekking delete Page(id)
router.post(
  '/delete/:id',
  agencyController.sessionAgency,
  agencyTrekkingController.delete
);

module.exports = router;
