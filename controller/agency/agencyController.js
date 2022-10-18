const destinationsModel = require('./../../model/destinationsModel');
const checkItemDelete = require('./../../utils/checkItemDelete');

// session middleware
exports.sessionAgency = (req, res, next) => {
  if (req.session.agency) {
    next();
  } else {
    res.redirect('/agency/login');
  }
};

// Home page(get)
exports.homePage = (req, res) => {
  try {
    res.render('agency/home');
  } catch (err) {
    console.log(err);
  }
};

// login pagee (get)
exports.login = (req, res) => {
  if (req.session.agency) {
    res.render('agency/home');
  } else {
    res.render('agency/login', { agencyErr: req.flash('agencyErr') });
  }
};
