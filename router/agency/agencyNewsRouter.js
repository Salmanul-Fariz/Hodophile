const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyNewsController = require('./../../controller/agency/agencyNewsController');

// require Multer
const Multer = require('../../utils/multer');
const newsMulter = Multer.newsMulter();

// get all news
router.get('/', agencyController.sessionAgency, agencyNewsController.news);

// Add News
router
  .route('/add')
  .get(agencyController.sessionAgency, agencyNewsController.newsPage)
  .post(
    agencyController.sessionAgency,
    newsMulter.single('newsImage'),
    agencyNewsController.newsAdd
  );

// Delete news
router.post(
  '/delete/:id',
  agencyController.sessionAgency,
  agencyNewsController.delete
);

module.exports = router;
