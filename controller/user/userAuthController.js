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
      req.session.userOtp = user;

      // otp generator
      req.session.otpGenerator = otpVerification.otpGeneration();
      console.log(req.session.otpGenerator);

      // message sending
      // otpVerification
      //   .otpSender(req.session.otpGenerator, userSignup.contact)
      //   .then(() => {
      //     res.redirect('/otp');
      //   });
      res.redirect('/otp');
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
    .otpSender(req.session.otpGenerator, req.session.userOtp.contact)
    .then(() => {
      res.redirect('/otp');
    });
};

// OTP page(Post)
exports.otp = async (req, res) => {
  try {
    if (req.session.otpGenerator === req.body.Otp) {
      const user = await userModel.create(req.session.userOtp);
      req.session.user = user;
      req.session.userOtp = null;
      req.session.otpGenerator = null;
      userSignup = null;
      res.redirect('/');
    } else {
      req.flash('otpErr', 'Please Enter correctly !');
      res.redirect('/otp');
    }
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
