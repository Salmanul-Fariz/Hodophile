const userModel = require('./../../model/userModel');
const destinationsModel = require('./../../model/destinationsModel');
const trekkingModel = require('./../../model/trekkingModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const session = require('express-session');

// session middleware
exports.sessionUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/signup');
  }
};

// User blocked checking
exports.checkBlocked = async (req, res, next) => {
  const id = req.session.user._id;
  const user = await userModel.findOne({ _id: id });
  if (user.blocked === true) {
    req.session.user = null;
    res.redirect('/signup');
  } else {
    next();
  }
};

// Home page
exports.homePage = async (req, res) => {
  try {
    const user = req.session.user;
    const allTours = await destinationsModel.find({});
    const tours = checkItemDelete(allTours);
    const allTrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(allTrekkings);
    res.render('user/home', { user, tours, trekkings });
    
  } catch (err) {
    console.log(err);
  }
};

// SignUp page
exports.signup = (req, res) => {
  try {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('user/signup', { userErr: req.flash('userErr') });
    }
  } catch (err) {
    console.log(err);
  }
};

// Login page
exports.login = (req, res) => {
  try {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('user/login', { userErr: req.flash('userErr') });
    }
  } catch (err) {
    console.log(err);
  }
};

// OTP page
exports.otp = (req, res) => {
  try {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('user/otp', { otpErr: req.flash('otpErr') });
    }
  } catch (err) {
    console.log(err);
  }
};

// log out (post)
exports.logout = (req, res) => {
  try {
    req.session.user = null;
    // res.json({status:true})
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

// Profile page
exports.profile = async (req, res) => {
  try {
    const userEmail = req.session.user.email;
    const user = await userModel.findOne({ email: userEmail });
    res.render('user/profile', { user });
  } catch (err) {
    console.log(err);
  }
};
