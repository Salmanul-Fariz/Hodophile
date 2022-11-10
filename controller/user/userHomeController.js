const destinationsModel = require('../../model/destinationsModel');
const trekkingModel = require('../../model/trekkingModel');
const checkItemDelete = require('../../utils/checkItemDelete');
const cartItemCount = require('../../utils/cartItemCount');
const wishlistItemCount = require('../../utils/wishlistItemCount');
const shoppingsModel = require('../../model/shoppingsModel');
const appError = require('./../../middleware/appError');

// Home page
exports.homePage = async (req, res, next) => {
  try {
    const user = req.session.user;
    const allTours = await destinationsModel.find({});
    const tours = checkItemDelete(allTours);
    const allTrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(allTrekkings);
    const allShoppings = await shoppingsModel.find({});
    const shoppings = checkItemDelete(allShoppings);
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/home', {
      user,
      tours,
      trekkings,
      shoppings,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};
