const destinationsModel = require('./../../model/destinationsModel');
const mongoosErr = require('./../../utils/mongoosErr');
const checkItemDelete = require('./../../utils/checkItemDelete');

const fs = require('fs');
const path = require('path');

// All Tours View page
exports.tours = async (req, res) => {
  try {
    const alltours = await destinationsModel.find({});
    const tours = checkItemDelete(alltours);
    res.render('agency/viewTours', { tours });
  } catch (err) {
    console.log(err);
  }
};

// Tour Page
exports.tour = async (req, res) => {
  try {
    const tour = await destinationsModel.findById(req.params.id);
    res.render('agency/viewTour', { tour });
  } catch (err) {
    console.log(err);
  }
};

// All Tours delete page
exports.deleteTours = async (req, res) => {
  try {
    const alltours = await destinationsModel.find({});
    const tours = checkItemDelete(alltours);
    res.render('agency/deleteTours', { tours });
  } catch (err) {
    console.log(err);
  }
};

// Tours delete page(post)
exports.delete = async (req, res) => {
  try {
    await destinationsModel.updateOne({_id:req.params.id}, {
      ItemDelete: true,
    });
    res.redirect('/agency/tours/delete');
  } catch (err) {
    console.log(err);
  }
};

// All Tours update page
exports.updateTours = async (req, res) => {
  try {
    const alltours = await destinationsModel.find({});
    const tours = checkItemDelete(alltours);
    res.render('agency/updateTours', { tours });
  } catch (err) {
    console.log(err);
  }
};

// Tour update page
exports.updateTour = async (req, res) => {
  try {
    const tour = await destinationsModel.findById(req.params.id);
    res.render('agency/updateTour', {
      tour,
      updateErr: req.flash('updateErr'),
    });
  } catch (err) {
    console.log(err);
  }
};

// Tour update Page(post)
exports.update = async (req, res) => {
  try {
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

    // When image update
    if (req.files.length !== 0) {
      // Make image path to Array
      let imagesName = [];
      for (file of req.files) {
        imagesName.push(file.filename);
      }

      // delete old image add new image path to database
      const image = await destinationsModel.findById(req.params.id);
      const imagePath = path.join(
        __dirname,
        '../',
        '../',
        'public/',
        'images/',
        'destination/'
      );
      for (let i = 0; i < image.Images.length; i++) {
        fs.unlinkSync(`${imagePath}/${image.Images[i]}`);
      }
      await destinationsModel.updateOne({_id:req.params.id}, {
        Images: imagesName,
      });
    }

    // Update the current Tour
    await destinationsModel.updateOne({_id:req.params.id}, {
      Name: req.body.tourName,
      Place: req.body.tourPlace,
      Country: req.body.tourCountry,
      State: req.body.tourState,
      City: req.body.tourCity,
      Description: req.body.tourDescription,
      ShortDescription: req.body.tourShortDescription,
      Features: req.body.tourFeatures,
      Coordinates: {
        Longitude: req.body.tourLongitude,
        Latitude: req.body.tourlatitude,
      },
      Duration: req.body.tourDuration,
      Review: req.body.tourReview,
      Difficulty: req.body.tourDifficulty,
      Price: req.body.tourPrice,
      Discount: req.body.tourDiscount,
      Itinerary: itineraryArray,
    });

    res.redirect('/agency/tours/update');

  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('updateErr', error);
    res.redirect('back');
  }
};

// Tour add page
exports.add = (req, res) => {
  try {
    res.render('agency/addTours', { tourErr: req.flash('tourErr') });
  } catch (err) {
    console.log(err);
  }
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

    // Make features to Array
    const length = req.body.tourFeatures.length;
    let featureArray = [];
    let j = 0;
    while (j < length) {
      j++;
      featureArray.push(req.body.tourFeatures[j - 1]);
    }

    // setting tour
    const tour = {
      Name: req.body.tourName,
      Place: req.body.tourPlace,
      Country: req.body.tourCountry,
      State: req.body.tourState,
      City: req.body.tourCity,
      Description: req.body.tourDescription,
      ShortDescription: req.body.tourShortDescription,
      Features: featureArray,
      Coordinates: {
        Longitude: req.body.tourLongitude,
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
