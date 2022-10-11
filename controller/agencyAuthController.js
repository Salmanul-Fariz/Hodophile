const agencyModel = require('./../model/agencyModel');

// Login page(Post)
exports.login = async (req, res) => {
  try {
    const agency = await agencyModel
      .findOne({ email: req.body.email })
      .select('+password');
    if (user) {
      let password = await user.correctPass(req.body.password, user.password);
      if (password) {
        req.session.user = user;
        res.redirect('/agency');
      } else {
        req.flash('userErr', 'password incorrect');
        res.redirect('/agency/login');
      }
    } else {
      req.flash('userErr', 'invalid ID');
      res.redirect('/agency/login');
    }
  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('userErr', error);
    res.redirect('/login');
  }
};
