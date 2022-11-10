const userModel = require('./../../model/userModel');
const userProfileAvatar = require('./../../model/userProfileAvatar');
const appError = require('./../../middleware/appError');

// user Details Page
exports.userdetails = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    users.reverse();

    res.render('agency/userDetails', { users });
  } catch (err) {
    appError(req, res, next);
  }
};

// user Block
exports.userBlock = async (req, res, next) => {
  try {
    await userModel.updateOne(
      { _id: req.params.id },
      {
        blocked: true,
      }
    );
    res.redirect('/agency/users');
  } catch (err) {
    appError(req, res, next);
  }
};

// user unblock
exports.userUnblock = async (req, res, next) => {
  try {
    await userModel.updateOne(
      { _id: req.params.id },
      {
        blocked: false,
      }
    );
    res.redirect('/agency/users');
  } catch (err) {
    appError(req, res, next);
  }
};

// Add Avatar (Post)
exports.addAvatars = async (req, res, next) => {
  try {
    await userProfileAvatar.create({
      Image: req.file.filename,
    });

    res.redirect('/agency/users');
  } catch (err) {
    appError(req, res, next);
  }
};
