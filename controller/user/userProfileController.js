const userProfileAvatar = require('./../../model/userProfileAvatar');
const userModel = require('./../../model/userModel');
const orderModel = require('./../../model/orderModel');
const shoppingsModel = require('./../../model/shoppingsModel');
const trekkingModel = require('./../../model/trekkingModel');
const destinationsModel = require('./../../model/destinationsModel');
const bookingsModel = require('./../../model/bookingsModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const emailVerification = require('./../../utils/emailVerification');
const otpGenerator = require('./../../utils/otpGenerator');
const otpVerification = require('./../../utils/otpVerification');
const mongoosErr = require('./../../utils/mongoosErr');
const appError = require('./../../middleware/appError');

// Profile page
exports.profile = async (req, res, next) => {
  try {
    const Id = req.session.user._id;
    const user = await userModel.findOne({ _id: Id });
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const avatars = await userProfileAvatar.find({});
    res.render('user/profile', {
      user,
      cartCount,
      wishlistCount,
      avatars,
      userEditErr: req.flash('userEditErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Update Avatar
exports.avatarsUpdate = async (req, res, next) => {
  try {
    const avatar = await userProfileAvatar.findById(req.params.avatarId);
    await userModel.updateOne(
      { _id: req.session.user._id },
      {
        ProfileImage: avatar.Image,
      }
    );

    res.redirect('/profile');
  } catch (err) {
    appError(req, res, next);
  }
};

// Update Profile(post)
exports.updateProfile = async (req, res, next) => {
  try {
    await userModel.updateOne(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
      }
    );

    res.redirect('/profile');
  } catch (err) {
    appError(req, res, next);
  }
};

// Update Personal Details
exports.updatePersonalDetails = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id).select('+password');
    if (!user) {
      req.flash('userEditErr', 'User ID is not Defined !');
      res.redirect('/profile');
    } else {
      let password = await user.correctPass(req.body.password, user.password);
      if (!password) {
        req.flash('userEditErr', 'Password Incorrect !');
        res.redirect('/profile');
      } else {
        req.session.personalUpdate = {
          user: req.params.id,
          type: req.body.personalDetail,
        };

        res.redirect('/profile/update/personal');
      }
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// Update Personal Details Page
exports.updatePersonalDetailsPage = async (req, res, next) => {
  try {
    if (req.session.personalUpdate) {
      const cartCount = await cartItemCount(req.session.user);
      const wishlistCount = await wishlistItemCount(req.session.user);
      const user = await userModel.findById(req.session.personalUpdate.user);
      const type = req.session.personalUpdate.type;
      req.session.personalUpdate = null;
      res.render('user/updatePersonal', {
        cartCount,
        wishlistCount,
        user,
        type,
      });
    } else {
      res.redirect('/profile');
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// Personal details Change Page (post)
exports.updatePersonalDetailsPost = async (req, res, next) => {
  try {
    if (req.params.type == 'Contact') {
      // otp generator
      req.session.personalOtpGenerator = {
        user: req.params.id,
        type: 'Contact',
        number: req.body.contact,
      };

      // message sending
      otpVerification
        .otpSender(req.body.contact)
        .then((response) => {
          res.redirect('/profile/personal/verification');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/profile');
        });
    } else {
      // otp generator
      req.session.personalOtpGenerator = {
        otp: otpGenerator(),
        user: req.params.id,
        type: 'Email',
        email: req.body.email,
      };

      // Send Mail
      emailVerification.emailSender(
        req.session.personalOtpGenerator.email,
        req.session.personalOtpGenerator.otp
      );

      res.redirect('/profile/personal/verification');
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// Personal Details verifications
exports.personalVerification = async (req, res, next) => {
  try {
    if (req.session.personalOtpGenerator) {
      const cartCount = await cartItemCount(req.session.user);
      const wishlistCount = await wishlistItemCount(req.session.user);
      const user = await userModel.findById(
        req.session.personalOtpGenerator.user
      );
      let type = req.session.personalOtpGenerator.type;
      if (type == 'Contact') {
        req.session.otp = {
          number: req.session.personalOtpGenerator.number,
        };
      } else {
        req.session.otp = {
          otp: req.session.personalOtpGenerator.otp,
          email: req.session.personalOtpGenerator.email,
        };
      }
      req.session.personalOtpGenerator = null;
      res.render('user/personalVerification', {
        cartCount,
        wishlistCount,
        user,
        type,
      });
    } else {
      res.redirect('/profile');
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// Otp Verifcation Page
exports.otpVerification = async (req, res) => {
  try {
    if (req.session.otp) {
      if (req.params.type == 'Contact') {
        let number = req.session.otp.number;
        // message Checking
        otpVerification
          .otpCheking(req.body.otp, number)
          .then(async (response) => {
            console.log(response);
            if (response.status === 'approved') {
              await userModel.updateOne(
                { _id: req.params.id },
                { contact: number }
              );
              res.redirect('/profile');
            } else {
              req.flash('userEditErr', 'Invalid Otp !');
              res.redirect('/profile');
            }
          });
      } else {
        if (req.session.otp.otp == req.body.otp) {
          await userModel.updateOne(
            { _id: req.params.id },
            { email: req.session.otp.email }
          );

          res.redirect('/profile');
        } else {
          req.flash('userEditErr', 'Invalid Otp !');
          res.redirect('/profile');
        }
      }
      req.session.otp = null;
    }
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('userEditErr', error);
    res.redirect('/profile');
  }
};

// Shoppings
exports.shopping = async (req, res, next) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const orders = await orderModel
      .find({ 'User.UserId': req.params.id })
      .populate('Order.ProductId')
      .sort({ Date: -1 });
    const user = await userModel.findById(req.params.id);

    res.render('user/profileShoppings', {
      orders,
      user,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// View Shoppings Details
exports.shoppingOrderview = async (req, res, next) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const order = await orderModel.findById(req.params.id);
    const Id = req.session.user._id;
    const user = await userModel.findOne({ _id: Id });

    let Products = [];
    // Product Details
    for (let i = 0; i < order.Order.length; i++) {
      const product = await shoppingsModel.findById(order.Order[i].ProductId);
      if (product) {
        Products.push(product.ShortName);
      }
    }

    res.render('user/profileShoppingsView', {
      cartCount,
      wishlistCount,
      order,
      user,
      Products,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Booking Page
exports.booking = async (req, res, next) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const bookings = await bookingsModel
      .find({ 'User.UserId': req.params.id })
      .populate('User.UserId')
      .populate('PackageId')
      .sort({ Date: -1 });

    const user = await userModel.findById(req.params.id);

    res.render('user/profileBookings', {
      user,
      bookings,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// View Booking Details
exports.bookingsview = async (req, res, next) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const booking = await bookingsModel.findById(req.params.id);
    const Id = req.session.user._id;
    const user = await userModel.findOne({ _id: Id });

    let Package;
    // Product Details
    if (booking.Category === 'Trekking') {
      const product = await trekkingModel.findById(booking.PackageId);
      Package = product.Name;
    } else {
      const product = await destinationsModel.findById(booking.PackageId);
      Package = product.Name;
    }

    res.render('user/profileBookingsView', {
      cartCount,
      wishlistCount,
      booking,
      user,
      Package,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Update Shopping Address Page
exports.updateAddressPage = async (req, res, next) => {
  try {
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);
    const user = await userModel.findById(req.params.id);
    const address = user.Address[req.params.adddressIndex];

    res.render('user/profileAddress', {
      cartCount,
      wishlistCount,
      address,
      user,
      index: req.params.adddressIndex,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// update Shopping Address
exports.updateAddress = async (req, res, next) => {
  try {
    const index = req.params.adddressIndex;
    await userModel.updateOne(
      {
        UserId: req.params.id,
      },
      {
        [`Address.${index}.Name`]: req.body.addressName,
        [`Address.${index}.Address`]: req.body.address,
        [`Address.${index}.Country`]: req.body.addressCountry,
        [`Address.${index}.State`]: req.body.addressState,
        [`Address.${index}.City`]: req.body.addressCity,
        [`Address.${index}.PIN`]: req.body.addressPincode,
      }
    );
    res.redirect(`/profile/shoppings/${req.params.id}`);
  } catch (err) {
    appError(req, res, next);
  }
};

// delete Shopping Address
exports.removeAddress = async (req, res, next) => {
  try {
    const index = req.params.adddressIndex;

    // To Remove element in array by index
    await userModel.updateOne(
      {
        UserId: req.params.id,
      },
      {
        $unset: { [`Address.${index}`]: 1 },
      }
    );
    await userModel.updateOne(
      {
        UserId: req.params.id,
      },
      {
        $pull: { Address: null },
      }
    );
    res.redirect('back');
  } catch (err) {
    appError(req, res, next);
  }
};
