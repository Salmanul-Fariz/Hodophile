const userModel = require('./../model/userModel');
const destinationsModel = require('./../model/destinationsModel');

// session middleware
exports.sessionUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/signup');
  }
};

// Home page
exports.homePage = async (req, res) => {
  const user = req.session.user;
  const tours = await destinationsModel.find({})
  res.render('user/home', { user,tours });
};

// SignUp page
exports.signup = (req, res) => {
  res.render('user/signup', { userErr: req.flash('userErr') });
};

// Login page
exports.login = (req, res) => {
  res.render('user/login', { userErr: req.flash('userErr') });
};

// OTP page
exports.otp = (req, res) => {
  res.render('user/otp', { otpErr: req.flash('otpErr') });
};

// log out (post)
exports.logout = (req, res) => {
  req.session.user = null;
  res.redirect('/');
};

// Profile page
exports.profile = async (req, res) => {
  const userEmail = req.session.user.email;
  const user = await userModel.findOne({ email: userEmail });
  res.render('user/profile', { user });
};

// Tours page
exports.tours = async (req, res) => {
  const tours = await destinationsModel.find({})
  res.render('user/tours',{tours});
};

// Tours details page
exports.toursDetails = async (req, res) => {
  const tour = await destinationsModel.findById(req.params.id)
  res.render('user/toursDetails',{tour});
};
