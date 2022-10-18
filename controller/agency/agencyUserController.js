const userModel = require('./../../model/userModel');

exports.userdetails = async (req, res) => {
  const users = await userModel.find({});
  res.render('agency/userDetails', { users });
};

exports.userBlock = async (req, res) => {
  await userModel.updateOne({_id:req.params.id}, {
    blocked: true,
  });
  res.redirect('/agency/users');
};

exports.userUnblock = async (req, res) => {
  await userModel.updateOne({_id:req.params.id}, {
    blocked: false,
  });
  res.redirect('/agency/users');
};
