const express = require('express');
const router = express.Router();

// require Session MiddleWare
const agencySession = require('./../../middleware/agencySession');

// Require Controller
const agencyShoppingsController = require('./../../controller/agency/agencyShoppingsController');

// require Multer
const Multer = require('./../../middleware/multer');
const shoppingMulter = Multer.shoppingMulter();

// Shoppings page
router.get('/', agencySession, agencyShoppingsController.shoppings);

// Shopppings Add
router
  .route('/add')
  .get(agencySession, agencyShoppingsController.viewAddShoppings)
  .post(
    agencySession,
    shoppingMulter.array('shoppingImages', 4),
    agencyShoppingsController.addShoppings
  );

// Shoppings Update
router.get('/update', agencySession, agencyShoppingsController.updateShoppings);

// Shopppings category
router
  .route('/category')
  .get(agencySession, agencyShoppingsController.viewCategory);

// Add Shopppings category
router
  .route('/category/add')
  .get(agencySession, agencyShoppingsController.addCategory)
  .post(agencySession, agencyShoppingsController.category);

// Shoppings Delete
router.get('/delete', agencySession, agencyShoppingsController.deleteShoppings);

// Shopping Delete
router.post('/delete/:id', agencySession, agencyShoppingsController.delete);

// shopping Update
router
  .route('/update/:id')
  .get(agencySession, agencyShoppingsController.updateShopping)
  .post(
    agencySession,
    shoppingMulter.array('shoppingImages', 4),
    agencyShoppingsController.update
  );

// Shopping Category delete
router.post(
  '/category/:id',
  agencySession,
  agencyShoppingsController.deleteCategory
);

// Shoppings Details Page
router.get('/:id', agencySession, agencyShoppingsController.shoppingsDetails);

module.exports = router;
