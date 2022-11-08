const userModel = require('./../../model/userModel');
const mongoosErr = require('./../../utils/mongoosErr');
const otpVerification = require('./../../utils/otpVerification');
const otpGenerator = require('./../../utils/otpGenerator');
const emailVerification = require('./../../utils/emailVerification');
const bcrypt = require('bcrypt');

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

// Reset Password (Page)
exports.resetPasswordPage = async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('user/resetPass', { userErr: req.flash('userErr') });
    }
  } catch (err) {
    console.log(err);
  }
};

// reset Password
exports.resetPassword = (req, res) => {
  try {
    req.session.resetOTP = otpGenerator();
    emailVerification.emailSender(req.body.email, req.session.resetOTP);
    req.session.resetNewPassword = req.body.email;

    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// otp verify
exports.resetPasswordVerify = (req, res) => {
  try {
    if (req.session.resetOTP === req.body.restOTP) {
      req.session.resetOTP = null;
      req.session.resetVerify = true;

      res.json({
        status: true,
      });
    } else {
      res.json({
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// New Password Page
exports.newPasswordPage = async (req, res) => {
  try {
    if (req.session.resetVerify) {
      res.render('user/password');
    } else {
      res.redirect('/login');
    }
    req.session.resetVerify = null;
  } catch (err) {
    console.log(err);
  }
};

// Add New Password
exports.Newpassword = async (req, res) => {
  try {
    if (req.body.newPassword) {
      const pass = await bcrypt.hash(req.body.newPassword, 12);
      await userModel.updateOne(
        {
          email: req.session.resetNewPassword,
        },
        {
          password: pass,
        }
      );

      req.session.resetNewPassword = null;
      res.redirect('/login');
    } else {
      req.flash('userErr', 'Cannot Change Password');
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
  }
};
