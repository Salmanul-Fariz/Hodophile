const userModel = require('./../model/userModel');
const mongoosErr = require('./../utils/mongoosErr');

// SignUp page(Post)
exports.signup = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      req.flash('userErr', 'Email is exist Please enter new ');
      res.redirect('/signup');
    } else {
      const user = await userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });
      req.session.user = user;
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('userErr', error);
    res.redirect('/signup');
  }
};

// Login page(Post)
exports.login = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select('+password');
    if (user) {
      let password = await user.correctPass(req.body.password, user.password);
      if (password) {
        req.session.user = user;
        res.redirect('/');
      } else {
        req.flash('userErr', 'password incorrect');
        res.redirect('/login');
      }
    } else {
      req.flash('userErr', 'invalid ID');
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('userErr', error);
    res.redirect('/login');
  }
};
