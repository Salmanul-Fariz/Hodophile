const express = require('express');
const router = express.Router();

// Require Controller
const agencyController = require('./../../controller/agency/agencyController');
const agencyShoppingsController = require('./../../controller/agency/agencyShoppingsController');

// require Multer
const Multer = require('./../../utils/multer');
const shoppingMulter = Multer.shoppingMulter();

// Shoppings page
router.get(
  '/',
  agencyController.sessionAgency,
  agencyShoppingsController.shoppings
);

// Shopppings Add
router
  .route('/add')
  .get(
    agencyController.sessionAgency,
    agencyShoppingsController.viewAddShoppings
  )
  .post(
    agencyController.sessionAgency,
    shoppingMulter.array('shoppingImages', 4),
    agencyShoppingsController.addShoppings
  );

// Shoppings Update
router.get(
  '/update',
  agencyController.sessionAgency,
  agencyShoppingsController.updateShoppings
);

// Shopppings category
router
  .route('/category')
  .get(agencyController.sessionAgency, agencyShoppingsController.viewCategory);

// Add Shopppings category
router
  .route('/category/add')
  .get(agencyController.sessionAgency, agencyShoppingsController.addCategory)
  .post(agencyController.sessionAgency, agencyShoppingsController.category);

// Shoppings Delete
router.get(
  '/delete',
  agencyController.sessionAgency,
  agencyShoppingsController.deleteShoppings
);

// Shopping Delete
router.post(
  '/delete/:id',
  agencyController.sessionAgency,
  agencyShoppingsController.delete
);

// shopping Update
router
  .route('/update/:id')
  .get(agencyController.sessionAgency, agencyShoppingsController.updateShopping)
  .post(
    agencyController.sessionAgency,
    shoppingMulter.array('shoppingImages', 4),
    agencyShoppingsController.update
  );

// Shopping Category delete
router.post(
  '/category/:id',
  agencyController.sessionAgency,
  agencyShoppingsController.deleteCategory
);

// Shoppings Details Page
router.get(
  '/:id',
  agencyController.sessionAgency,
  agencyShoppingsController.shoppingsDetails
);

module.exports = router;
