const destinationsModel = require('./../../model/destinationsModel');
const userModel = require('./../../model/userModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');

// Tours page
exports.tours = async (req, res) => {
  try {
    const allTours = await destinationsModel.find({});
    const tours = checkItemDelete(allTours);

    // To Google Map Setup
    const coordinates = [];
    for (let el of tours) {
      let x = [];
      x.push(el.Coordinates.Longitude);
      x.push(el.Coordinates.Latitude);
      coordinates.push(x);
    }
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/tours', { tours, coordinates, cartCount, wishlistCount });
  } catch (err) {
    console.log(err);
  }
};

// Tours details page
exports.details = async (req, res) => {
  try {
    const tour = await destinationsModel.findById(req.params.id);
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const user = await userModel.findById(req.session.user._id);

    let bookingPrice = tour.Price;
    let bookingDiscount = Math.round((bookingPrice / 100) * tour.Discount);
    let BookingTotal = bookingPrice - bookingDiscount;
    res.render('user/toursDetails', {
      tour,
      cartCount,
      wishlistCount,
      user,
      bookingPrice: bookingPrice,
      bookingDiscount: bookingDiscount,
      BookingTotal: BookingTotal,
      bookingPopup: req.flash('bookingPopup'),
    });
  } catch (err) {
    console.log(err);
  }
};
