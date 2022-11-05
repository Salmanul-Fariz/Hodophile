const userModel = require('./../model/userModel');

// User blocked checking
module.exports = async (req, res, next) => {
  const id = req.session.user._id;
  const user = await userModel.findOne({ _id: id });
  if (user.blocked === true) {
    req.session.user = null;
    res.redirect('/signup');
  } else {
    next();
  }
};
