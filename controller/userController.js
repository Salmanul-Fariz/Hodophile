const userModel = require('./../model/userModel');

// Home page (get)
exports.homePage = (req, res) => {
  let user = req.session.user;
  res.render('user/home', { user });
};

// SignUp page(get)
exports.signup = (req, res) => {
  res.render('user/signup', { userErr: req.flash('userErr') });
};

// // Login page(get)
exports.login = (req, res) => {
  res.render('user/login', { userErr: req.flash('userErr') });
};

exports.otp = (req, res) => {
  res.render('user/otp', { otpErr: req.flash('otpErr') });
}