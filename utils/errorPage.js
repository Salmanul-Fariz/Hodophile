module.exports = (res, errStatus, errMessage, errRoute) => {
  res.render('user/ErrorPage', {
    errStatus: errStatus,
    errMessage: errMessage,
    errRoute: errRoute,
  });
};
