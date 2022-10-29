const trekkingModel = require('./../../model/trekkingModel');
const userModel = require('./../../model/userModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');

// Trekkings page
exports.trekkings = async (req, res) => {
  try {
    const allTrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(allTrekkings);

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
      trekkings,
      coordinates,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    console.log(err);
  }
};

// Trekking details page
exports.details = async (req, res) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const user = await userModel.findById(req.session.user._id);

    req.session.bookingPrice = trekking.Price;
    req.session.bookingDiscount = Math.round(
      (req.session.bookingPrice / 100) * trekking.Discount
    );
    req.session.BookingTotal =
      req.session.bookingPrice - req.session.bookingDiscount;

    res.render('user/trekkingsDetails', {
      trekking,
      cartCount,
      wishlistCount,
      user,
      bookingPrice: req.session.bookingPrice,
      bookingDiscount: req.session.bookingDiscount,
      BookingTotal: req.session.BookingTotal,
      bookingPopup: req.flash('bookingPopup'),
    });
  } catch (err) {
    console.log(err);
  }
};
