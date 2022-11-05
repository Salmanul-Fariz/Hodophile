const express = require('express');
const router = express.Router();

// require Session MiddleWare
const userBlockCheck = require('../../middleware/userBlockCheck');
const userSession = require('../../middleware/userSession');

// require controller
const userWishlistController = require('./../../controller/user/userWishlistController');

// Get Wishlist Page
router.get(
  '/',
  userSession,
  userBlockCheck,
  userWishlistController.wishlistPage
);

// Add To Cart
router.get(
  '/addCart/:userId/:productId',
  userSession,
  userBlockCheck,
  userWishlistController.wishlistAddToCart
);

// Remove from Wishlist
router.get(
  '/remove/:userId/:productId',
  userSession,
  userBlockCheck,
  userWishlistController.removeWishlist
);

// Add To wishlist
router.get(
  '/:userId/:productId',
  userSession,
  userBlockCheck,
  userWishlistController.Wishlist
);

module.exports = router;
