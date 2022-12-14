const shoppingsModel = require('./../../model/shoppingsModel');
const shoppingCategoryModel = require('./../../model/shoppingCategoryModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const wishlistModel = require('./../../model/wishlistModel');
const appError = require('./../../middleware/appError');

// Shopping Page
exports.shoppingPage = async (req, res, next) => {
  try {
    const categories = await shoppingCategoryModel.find({});
    const allproducts = await shoppingsModel.find({});
    let products;
    let Category;
    if (req.session.filter) {
      products = await checkItemDelete(req.session.filter);
      Category = req.session.filterCategory;
    } else {
      products = await checkItemDelete(allproducts);
      Category = 'All';
    }
    req.session.filter = null;
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const wishlist = await wishlistModel.findOne({
      UserId: req.session.user._id,
    });
    const user = req.session.user;

    res.render('user/shoppings', {
      user,
      categories,
      products,
      Category,
      userId: req.session.user._id,
      cartCount,
      wishlist,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shopping Product Details
exports.shoppingDetailsPage = async (req, res, next) => {
  try {
    const product = await shoppingsModel.findById(req.params.id);
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const wishlist = await wishlistModel.findOne({
      UserId: req.session.user._id,
      'Products.productId': req.params.id,
    });
    const user = req.session.user;

    res.render('user/shoppingsDetails', {
      user,
      product,
      userId: req.session.user._id,
      cartCount,
      wishlist,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Filtering the shoppping
exports.filterProducts = async (req, res, next) => {
  try {
    req.session.filterCategory = req.params.filter;
    if (req.params.filter == 'All') {
      req.params.filter === null;
    } else {
      req.session.filter = await shoppingsModel.find({
        Category: req.params.filter,
      });
    }
    res.json({
      status: true,
    });
  } catch (err) {
    appError(req, res, next);
  }
};
