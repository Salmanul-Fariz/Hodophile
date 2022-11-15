const newsModel = require('./../../model/newsModel');
const userModel = require('./../../model/userModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const appError = require('./../../middleware/appError');

// News Page
exports.news = async (req, res, next) => {
  try {
    const user = req.session.user;
    const news = await newsModel.find({});
    const userId = await userModel.findOne({ _id: req.session.user._id });
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/news', {
      user,
      news,
      NewsLike: user.NewsLike,
      userId: userId._id,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// News Increment
exports.increment = async (req, res, next) => {
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
    appError(req, res, next);
  }
};

// News Decrement
exports.decrement = async (req, res, next) => {
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
    appError(req, res, next);
  }
};
