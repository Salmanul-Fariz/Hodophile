const express = require('express');
const router = express.Router();

// require controller
const userController = require('./../../controller/user/userController');
const userWishlistController = require('./../../controller/user/userWishlistController');

// Get Cart Page
router.get(
  '/',
  userController.sessionUser,
  userController.checkBlocked,
  userWishlistController.wishlistPage
);

// Add To Cart
router.get(
  '/addCart/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userWishlistController.Wishlist
);

// Remove from Wishlist
router.get(
  '/remove/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userWishlistController.removeWishlist
);

// Add To wishlist
router.get(
  '/:userId/:productId',
  userController.sessionUser,
  userController.checkBlocked,
  userWishlistController.Wishlist
);

module.exports = router;
