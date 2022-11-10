const ErrorPage = require('./../utils/errorPage');

module.exports = (req, res, next) => {
  const urlType = req.originalUrl.split('/')[1];
  if (urlType === 'agency') {
    ErrorPage(
      res,
      `Opps! The page does not exist!`,
      `The page '${req.originalUrl}' which you are looking for does not exist . Please return to the homepage.`,
      '/agency'
    );
  } else {
    ErrorPage(
      res,
      `Opps! The page does not exist!`,
      `The page '${req.originalUrl}' which you are looking for does not exist . Please return to the homepage.`,
      '/'
    );
  }
};
