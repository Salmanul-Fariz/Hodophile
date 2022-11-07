const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');

// Contact Page
exports.contactPage = async (req, res) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/contact', {
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    console.log(err);
  }
};
