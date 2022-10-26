const cartModel = require('./../model/cartModel');

module.exports = async (user) => {
  if (!user) {
    return 0;
  } else {
    const cart = await cartModel.findOne({ UserId: user._id });
    if (!cart) {
      return 0;
    } else {
      return cart.Products.length;
    }
  }
};
