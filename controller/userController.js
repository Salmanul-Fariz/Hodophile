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
  try {
    const user = req.session.user;
    const tours = await destinationsModel.find({});
    res.render('user/home', { user, tours });
  } catch (err) {
    console.log(err);
  }
};

// SignUp page
exports.signup = (req, res) => {
  try {
    if (req.session.user) {
      res.redirect('/')
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
      res.redirect('/')
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
    res.render('user/otp', { otpErr: req.flash('otpErr') });
  } catch (err) {
    console.log(err);
  }
};

// log out (post)
exports.logout = (req, res) => {
  try {
    req.session.user = null;
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

// Tours page
exports.tours = async (req, res) => {
  try {
    const tours = await destinationsModel.find({});
    res.render('user/tours', { tours });
  } catch (err) {
    console.log(err);
  }
};

// Tours details page
exports.toursDetails = async (req, res) => {
  try {
    const tour = await destinationsModel.findById(req.params.id);
    res.render('user/toursDetails', { tour });
  } catch (err) {
    console.log(err);
  }
};
