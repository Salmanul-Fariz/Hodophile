const userModel = require('./../../model/userModel');
const mongoosErr = require('./../../utils/mongoosErr');
const otpVerification = require('./../../utils/otpVerification');

// SignUp page(Post)
exports.signup = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      req.flash('userErr', 'Email is exist Please enter new ');
      res.redirect('/signup');
    } else {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      };

      //session setting
      req.session.userSignup = user;

      // message sending
      otpVerification
        .otpSender(req.session.userSignup.contact)
        .then((response) => {
          res.redirect('/otp');
        })
        .catch((err) => {
          console.log(err);
          req.flash('userErr', 'Something Went Wrong');
          res.redirect('/signup');
        });
    }
  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('userErr', error);
    res.redirect('/signup');
  }
};

// Resent OTP
exports.resend = (req, res) => {
  // message sending
  otpVerification
    .otpSender(req.session.userSignup.contact)
    .then((response) => {
      res.redirect('/otp');
    })
    .catch((err) => {
      console.log(err);
      req.flash('otpErr', 'Something Went Wrong');
      res.redirect('/otp');
    });
};

// OTP page(Post)
exports.otp = async (req, res) => {
  try {
    // message Checking
    otpVerification
      .otpCheking(req.body.Otp, req.session.userSignup.contact)
      .then(async (response) => {
        if (response.status === 'approved') {
          const user = await userModel.create(req.session.userSignup);
          req.session.user = user;
          req.session.userSignup = null;
          res.redirect('/');
        } else {
          req.flash('otpErr', 'OTP is Incorrect !');
          res.redirect('/otp');
        }
      })
      .catch((err) => {
        console.log(err);
        req.flash('otpErr', 'Something Went Wrong !');
        res.redirect('/otp');
      });
  } catch (err) {
    console.log(err);
  }
};

// Login page(Post)
exports.login = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select('+password');
    if (!req.body.password || !req.body.email) {
      req.flash('userErr', 'Fields required');
      res.redirect('/login');
    } else if (user.blocked === true) {
      req.flash('userErr', 'Id is Blocked');
      res.redirect('/login');
    } else if (user) {
      let password = await user.correctPass(req.body.password, user.password);
      if (password) {
        req.session.user = user;
        res.redirect('/');
      } else {
        req.flash('userErr', 'Password incorrect');
        res.redirect('/login');
      }
    } else {
      req.flash('userErr', 'Invalid ID');
      res.redirect('/login');
    }
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('userErr', error);
    res.redirect('/login');
  }
};

// SignUp page
exports.signupPage = (req, res) => {
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
exports.loginPage = (req, res) => {
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
exports.otpPage = (req, res) => {
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
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
