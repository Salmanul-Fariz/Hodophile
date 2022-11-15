const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const sendContactMail = require('./../../utils/sendContactMail');
const appError = require('./../../middleware/appError');

// Contact Page
exports.contactPage = async (req, res, next) => {
  try {
    const user = req.session.user;
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/contact', {
      user,
      cartCount,
      wishlistCount,
      msgErr: req.flash('msgErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// send mail To admin
exports.contact = async (req, res, next) => {
  try {
    sendContactMail(
      req.body.contactEmail,
      req.body.contactName,
      req.body.contactSubject,
      req.body.contactMessage,
      req.body.contactPhone
    )
      .then((response) => {
        res.redirect('/');
      })
      .catch((err) => {
        req.flash('msgErr', 'Something Went Wrong !');
        res.redirect('/contact');
      });
  } catch (err) {
    appError(req, res, next);
  }
};
