const trekkingModel = require('./../../model/trekkingModel');
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

    res.render('user/trekkingsDetails', { trekking, cartCount, wishlistCount });
  } catch (err) {
    console.log(err);
  }
};
