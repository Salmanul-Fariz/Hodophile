const userModel = require('./../../model/userModel');

exports.userdetails = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.render('agency/userDetails', { users });
  } catch (err) {
    console.log(err);
  }
};

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
