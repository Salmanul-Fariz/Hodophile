// Agency Session middleware
module.exports = (req, res, next) => {
  if (req.session.agency) {
    next();
  } else {
    res.redirect('/agency/login');
  }
};
