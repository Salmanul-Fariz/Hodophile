const newsModel = require('./../../model/newsModel');
const userModel = require('./../../model/userModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');

// News Page
exports.news = async (req, res) => {
  try {
    const news = await newsModel.find({});
    const user = await userModel.findOne({ _id: req.session.user._id });
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/news', {
      news,
      NewsLike: user.NewsLike,
      userId: user._id,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    console.log(err);
  }
};

// News Increment
exports.increment = async (req, res) => {
  try {
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
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// News Decrement
exports.decrement = async (req, res) => {
  try {
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
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};
