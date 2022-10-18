const agencyModel = require('./../../model/agencyModel');
const mongoosErr = require('./../../utils/mongoosErr');

// Login page(Post)
exports.login = async (req, res) => {
  try {
    const agency = await agencyModel
      .findOne({ email: req.body.email })
      .select('+password');
    if (!req.body.email || !req.body.password || !req.body.passwordConfirm) {
      req.flash('agencyErr', 'Fields required');
      res.redirect('/agency/login');
    } else if (agency) {
      let password = await agency.correctPass(
        req.body.password,
        agency.password
      );
      if (password) {
        if (req.body.password === req.body.passwordConfirm) {
          req.session.agency = agency;
          res.redirect('/agency');
        } else {
          req.flash('agencyErr', `Password didn't match`);
          res.redirect('/agency/login');
        }
      } else {
        req.flash('agencyErr', 'Password incorrect');
        res.redirect('/agency/login');
      }
    } else {
      req.flash('agencyErr', 'Invalid ID');
      res.redirect('/agency/login');
    }
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('agencyErr', error);
    res.redirect('/login');
  }
};

// agency signup post (only for test in postman)
exports.signup = async (req, res) => {
  const agency = await agencyModel.create(req.body);
  res.status(200).json({
    status: 'success',
    agency,
  });
};
