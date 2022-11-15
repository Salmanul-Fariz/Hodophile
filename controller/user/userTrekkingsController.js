const trekkingModel = require('./../../model/trekkingModel');
const userModel = require('./../../model/userModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const appError = require('./../../middleware/appError');

// Trekkings page
exports.trekkings = async (req, res, next) => {
  try {
    const allTrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(allTrekkings);
    const user = req.session.user;

    // To Google Map Setup
    const coordinates = [];
    for (let el of trekkings) {
      let x = [];
      x.push(el.Coordinates.Longitude);
      x.push(el.Coordinates.Latitude);
      coordinates.push(x);
    }
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/trekkings', {
      user,
      trekkings,
      coordinates,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekking details page
exports.details = async (req, res, next) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const user = await userModel.findById(req.session.user._id);

    let bookingPrice = trekking.Price;
    let bookingDiscount = Math.round((bookingPrice / 100) * trekking.Discount);
    let BookingTotal = bookingPrice - bookingDiscount;

    if (req.session.bookingMsg == 'Coupon is not Existed') {
      req.flash('bookingMsg', req.session.bookingMsg);
    } else if (req.session.bookingMsg) {
      let couponDiscount = Math.round(
        (BookingTotal / 100) * req.session.bookingMsg.Discount
      );
      bookingDiscount += couponDiscount;
      BookingTotal -= couponDiscount;
      req.flash('bookingMsg', req.session.bookingMsg.Discount);
    }
    req.session.bookingMsg = null;

    res.render('user/trekkingsDetails', {
      trekking,
      cartCount,
      wishlistCount,
      user,
      couponsOpen: req.flash('bookingMsg'),
      bookingPrice: bookingPrice,
      bookingDiscount: bookingDiscount,
      BookingTotal: BookingTotal,
    });
  } catch (err) {
    appError(req, res, next);
  }
};
