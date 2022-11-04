const userModel = require('./../../model/userModel');
const userProfileAvatar = require('./../../model/userProfileAvatar');

// user Details Page
exports.userdetails = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.render('agency/userDetails', { users });
  } catch (err) {
    console.log(err);
  }
};

// user Block
exports.userBlock = async (req, res) => {
  try {
    await userModel.updateOne(
      { _id: req.params.id },
      {
        blocked: true,
      }
    );
    res.redirect('/agency/users');
  } catch (err) {
    console.log(err);
  }
};

// user unblock
exports.userUnblock = async (req, res) => {
  try {
    await userModel.updateOne(
      { _id: req.params.id },
      {
        blocked: false,
      }
    );
    res.redirect('/agency/users');
  } catch (err) {
    console.log(err);
  }
};

// Add Avatar (Post)
exports.addAvatars = async (req, res) => {
  try {
    console.log(req.file.filename);
    await userProfileAvatar.create({
      Image: req.file.filename,
    });

    res.redirect('/agency/users')
  } catch (err) {
    console.log(err);
  }
};
