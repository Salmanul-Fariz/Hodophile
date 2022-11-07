// Home page(get)
exports.dashboardPage = (req, res) => {
  try {
    res.render('agency/dashboard');
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
