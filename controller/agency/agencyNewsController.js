const newsModel = require('./../../model/newsModel');
const mongoosErr = require('./../../utils/mongoosErr');

const fs = require('fs');
const path = require('path');

// Get All news page
exports.news = async (req, res) => {
  try {
    const news = await newsModel.find({});
    res.render('agency/news', { news });
  } catch (err) {
    console.log(err);
  }
};

//  Add News page
exports.newsPage = (req, res) => {
  try {
    res.render('agency/addNews', { newsErr: req.flash('newsErr') });
  } catch (err) {
    console.log(err);
  }
};

// Add News(post)
exports.newsAdd = async (req, res) => {
  try {
    await newsModel.create({
      Title: req.body.title,
      Place: req.body.place,
      ShortDescription: req.body.shortDescription,
      Image: req.file.filename,
    });
    res.redirect('/agency/news');
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('newsErr', error);
    res.redirect('/agency/news/add');
  }
};

// To delete News (post)
exports.delete = async (req, res) => {
  try {
    // delete old image
    const image = await newsModel.findById(req.params.id);
    const imagePath = path.join(
      __dirname,
      '../',
      '../',
      'public/',
      'images/',
      'news/'
    );
    fs.unlinkSync(`${imagePath}/${image.Image}`);

    await newsModel.deleteOne({ _id: req.params.id });
    res.redirect('/agency/news');
  } catch (err) {
    console.log(err);
  }
};
