const express = require('express');
const router = express.Router();

// Require Controller
const userShoppingController = require('./../../controller/user/userShoppingController');

// Shopping Page
router.get('/', userShoppingController.shoppingPage);

// Shopping Product Details
router.get('/:id', userShoppingController.shoppingDetailsPage);

module.exports = router;
