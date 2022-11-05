const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// require controller
const agencyNewsController = require('./../../controller/agency/agencyNewsController');

// require Multer
const Multer = require('../../middleware/multer');
const newsMulter = Multer.newsMulter();

// get all news
router.get('/', agencySession, agencyNewsController.news);

// Add News
router
  .route('/add')
  .get(agencySession, agencyNewsController.newsPage)
  .post(
    agencySession,
    newsMulter.single('newsImage'),
    agencyNewsController.newsAdd
  );

// Delete news
router.post('/delete/:id', agencySession, agencyNewsController.delete);

module.exports = router;
