const wishlistModel = require('./../../model/wishlistModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const shoppingsModel = require('./../../model/shoppingsModel');
const checkItemDelete = require('../../utils/checkItemDelete');
const cartModel = require('../../model/cartModel');

// Get Wishlist Page
exports.wishlistPage = async (req, res) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const wishlist = await wishlistModel.findOne({ UserId: req.session.user });

    // Set Cart Add Product Details
    let AllWishlistProducts = [];
    let wishlistProducts = null;
    let userWishlist = false;
    if (wishlist) {
      userWishlist = true;
      for (let i = 0; i < wishlist.Products.length; i++) {
        const product = await shoppingsModel.findById(
          wishlist.Products[i].productId
        );
        if (product) {
          AllWishlistProducts.push(product);
        }
      }
      wishlistProducts = await checkItemDelete(AllWishlistProducts);
    }

    res.render('user/wishlists', {
      cartCount,
      wishlistProducts,
      userWishlist,
      wishlistCount,
      userId: req.session.user._id,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add To WishList
exports.Wishlist = async (req, res) => {
  try {
    const wishlistDocuments = await wishlistModel.findOne({
      UserId: req.params.userId,
    });

    // User has No Document
    if (!wishlistDocuments) {
      await wishlistModel.create({
        UserId: req.params.userId,
        Products: {
          productId: req.params.productId,
          add: true,
        },
      });
      res.json({
        status: true,
      });
    } else {
      const productExist = await wishlistModel.aggregate([
        { $match: { UserId: req.params.userId } },
        { $unwind: '$Products' },
        {
          $match: {
            'Products.productId': req.params.productId,
          },
        },
      ]);

      // Product Not Exist
      if (productExist.length === 0) {
        await wishlistModel.updateOne(
          { UserId: req.params.userId },
          {
            $push: {
              Products: {
                productId: req.params.productId,
                add: true,
              },
            },
          }
        );
        res.json({
          status: true,
        });
      } else {
        // Delete document when wishlist empty
        if (wishlistDocuments.Products.length == 1) {
          await wishlistModel.deleteOne({ UserId: req.params.userId });
          res.json({
            status: false,
          });
        }
        // remove product from wishlist
        else {
          await wishlistModel.updateOne(
            { UserId: req.params.userId },
            {
              $pull: {
                Products: {
                  productId: req.params.productId,
                },
              },
            }
          );
          res.json({
            status: false,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Remove From Wishlist
exports.removeWishlist = async (req, res) => {
  try {
    // Remove From Wishlist
    const userCart = await wishlistModel.findOne({ UserId: req.params.userId });
    if (userCart.Products.length > 1) {
      await wishlistModel.updateOne(
        { UserId: req.params.userId },
        { $pull: { Products: { productId: req.params.productId } } }
      );
    } else {
      await wishlistModel.deleteOne({ UserId: req.params.userId });
    }
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add to cart
exports.wishlistAddToCart = async (req, res) => {
  try {
    const cartDocuments = await cartModel.findOne({
      UserId: req.params.userId,
    });

    // User has No Document
    if (!cartDocuments) {
      await cartModel.create({
        UserId: req.params.userId,
        Products: {
          productId: req.params.productId,
          Count: 1,
        },
      });
      res.json({
        status: true,
        inc: true,
      });
    } else {
      let productExist = await cartModel.aggregate([
        { $match: { UserId: req.params.userId } },
        { $unwind: '$Products' },
        { $match: { 'Products.productId': req.params.productId } },
      ]);
      // Product Not Exist
      if (productExist.length === 0) {
        await cartModel.updateOne(
          { UserId: req.params.userId },
          {
            $push: {
              Products: {
                productId: req.params.productId,
                Count: 1,
              },
            },
          }
        );
        res.json({
          status: true,
          inc: true,
        });
      } else {
        // Find The Count
        const cartCount = await cartModel.aggregate([
          { $match: { UserId: req.params.userId } },
          { $unwind: '$Products' },
          { $match: { 'Products.productId': req.params.productId } },
        ]);

        console.log(cartCount);

        // Product Exist
        if (cartCount[0].Products.Count < 10) {
          const product = await cartModel.findOne({
            UserId: req.params.userId,
          });
          let productIndex = product.Products.findIndex(
            (p) => p.productId == req.params.productId
          );
          let productInc = product.Products[productIndex];
          productInc.Count = productInc.Count + 1;
          product.Products[productIndex] = productInc;
          product.save();
        }
        res.json({
          status: true,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
