const destination = require('./../model/destinationsModel');
const destinationsModel = require('./../model/destinationsModel');
const mongoosErr = require('./../utils/mongoosErr');

// session middleware
exports.sessionAgency = (req, res, next) => {
  if (req.session.agency) {
    next();
  } else {
    res.redirect('/agency/login');
  }
};

// Home page(get)
exports.homePage = (req, res) => {
  res.render('agency/home');
};

// login pagee (get)
exports.login = (req, res) => {
  if (req.session.agency) {
    res.render('agency/home');
  } else {
    res.render('agency/login', { agencyErr: req.flash('agencyErr') });
  }
};

// Tours View page
exports.tours = (req, res) => {
  res.render('agency/viewTours');
};

// Tour delete page
exports.delete = (req, res) => {
  res.render('agency/deleteTours');
};

// Tour update page
exports.update = (req, res) => {
  res.render('agency/updateTours');
};

// Tour add page
exports.add = (req, res) => {
  res.render('agency/addTours', { tourErr: req.flash('tourErr') });
};

// Tour Add (post)
exports.addPost = async (req, res) => {
  try {
    // Make image path to Array
    let imagesName = [];
    for (file of req.files) {
      imagesName.push(file.filename);
    }

    // Make Itinerary to Array
    let day = req.body.tourDuration;
    let itineraryArray = [];
    let i = 0;
    while (i < day) {
      i++;
      let object = {};
      object.Day = i;
      object.Title = req.body.DayTitle[i - 1];
      object.Description = req.body.DayDescription[i - 1];
      itineraryArray.push(object);
    }

    // setting tour
    const tour = {
      Name: req.body.tourName,
      Place: req.body.tourPlace,
      Country: req.body.tourCountry,
      State: req.body.tourState,
      City: req.body.tourCity,
      Coordinates: {
        Logitude: req.body.tourLongitude,
        Latitude: req.body.tourlatitude,
      },
      Duration: req.body.tourDuration,
      Review: req.body.tourReview,
      Difficulty: req.body.tourDifficulty,
      Price: req.body.tourPrice,
      Discount: req.body.tourDiscount,
      Images: imagesName,
      Itinerary: itineraryArray,
    };

    // insert to database
    await destinationsModel.create(tour);

    res.redirect('/agency/tours');
  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('tourErr', error);
    res.redirect('/agency/tours/add');
  }
};
