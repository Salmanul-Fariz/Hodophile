const wishlistModel = require('./../model/wishlistModel');

module.exports = async (user) => {
  if (!user) {
    return 0;
  } else {
    const wishlist = await wishlistModel.findOne({ UserId: user._id });
    if (!wishlist) {
      return 0;
    } else {
      return wishlist.Products.length;
    }
  }
};