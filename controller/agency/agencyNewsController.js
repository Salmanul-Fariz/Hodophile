const newsModel = require('./../../model/newsModel');


// Get All news page
exports.news = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
  const news = await newsModel.find({});
  res.render('agency/news', { news });
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
     const news = await newsModel.create({
      Title: req.body.title,
      Place: req.body.place,
      ShortDescription: req.body.shortDescription,
      Image: req.file.filename,
    });
    console.log(news);
    const user = await 
    res.redirect('/agency/news')
  } catch (err) {
    console.log(err);
  }
};

// To delete News (post)
exports.delete = async(req, res) => {
  try {
    await newsModel.deleteOne({_id:req.params.id});
    res.redirect('/agency/news')
  } catch (err) {
    console.log(err);
  }
};
