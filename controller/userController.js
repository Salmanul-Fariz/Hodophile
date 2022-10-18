const userModel = require('./../model/userModel');
const destinationsModel = require('./../model/destinationsModel');
const checkItemDelete = require('./../utils/checkItemDelete');

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
    const allTours = await destinationsModel.find({});
    const tours = checkItemDelete(allTours);
    res.render('user/home', { user, tours });
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
    res.render('user/otp', { otpErr: req.flash('otpErr') });
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
