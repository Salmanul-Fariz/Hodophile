const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const sendContactMail = require('./../../utils/sendContactMail');

// Contact Page
exports.contactPage = async (req, res) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/contact', {
      cartCount,
      wishlistCount,
      msgErr: req.flash('msgErr'),
    });
  } catch (err) {
    console.log(err);
  }
};

// send mail To admin
exports.contact = async (req, res) => {
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
    console.log(err);
  }
};
