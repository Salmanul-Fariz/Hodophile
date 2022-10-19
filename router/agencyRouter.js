const express = require('express');
const router = express.Router();

// require controller
const agencyController = require('./../controller/agency/agencyController');
const agencyAuthController = require('./../controller/agency/agencyAuthController');
const agencyUserController = require('./../controller/agency/agencyUserController');
const agencyNewsController = require('./../controller/agency/agencyNewsController');

// require Multer
const Multer = require('./../utils/multer');
const newsMulter = Multer.newsMulter();

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

//////////////////////////////////
////////////   News   ////////////
//////////////////////////////////

// get all news
router.get('/news', agencyController.sessionAgency, agencyNewsController.news);

// Add News
router
  .route('/news/add')
  .get(agencyController.sessionAgency, agencyNewsController.newsPage)
  .post(
    agencyController.sessionAgency,
    newsMulter.single('newsImage'),
    agencyNewsController.newsAdd
  );

// Delete news
router.post(
  '/news/delete/:id',
  agencyController.sessionAgency,
  agencyNewsController.delete
);

module.exports = router;
