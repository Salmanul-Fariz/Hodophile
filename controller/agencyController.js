
// session middleware
exports.sessionAgency = (req, res, next) => {
  if (req.session.agency) {
    next();
  } else {
    res.redirect('/agency/login');
  }
};

// Home page
exports.homePage = (req, res) => {
  res.render('agency/home');
};

// login pagee (get)
exports.login = (req, res) => {
  res.render('agency/login');
};
