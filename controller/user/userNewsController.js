const newsModel = require('./../../model/newsModel');
const userModel = require('./../../model/userModel');

// News Page
exports.news = async (req, res) => {
  try {
    const news = await newsModel.find({});
    const user = await userModel.findOne({ _id: req.session.user._id });
    res.render('user/news', {
      news,
      NewsLike: user.NewsLike,
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
  }
};

// News Increment
exports.increment = async (req, res) => {
  await userModel.updateOne(
    { _id: req.params.userId },
    { $push: { NewsLike: req.params.newsId } }
  );
  await newsModel.updateOne(
    { _id: req.params.newsId },
    {
      $inc: { Like: 1 },
    }
  );
};

// News Decrement
exports.decrement =async (req, res) => {
  await userModel.updateOne(
    { _id: req.params.userId },
    { $pull: { NewsLike: req.params.newsId } }
  );
  await newsModel.updateOne(
    { _id: req.params.newsId },
    {
      $inc: { Like: -1 },
    }
  );
};
