const trekkingModel = require('./../../model/trekkingModel');
const mongoosErr = require('./../../utils/mongoosErr');
const checkItemDelete = require('./../../utils/checkItemDelete');
const appError = require('./../../middleware/appError');

const fs = require('fs');
const path = require('path');

// All Trekking View page
exports.trekkings = async (req, res, next) => {
  try {
    const alltrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(alltrekkings);
    trekkings.reverse();

    res.render('agency/viewTrekkings', { trekkings });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekking Page
exports.trekking = async (req, res, next) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);
    res.render('agency/viewTrekking', { trekking });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekking add page
exports.add = (req, res, next) => {
  try {
    res.render('agency/addTrekkings', {
      trekkingErr: req.flash('trekkingErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekking Add (post)
exports.addPost = async (req, res, next) => {
  try {
    // Make image path to Array
    let imagesName = [];
    for (file of req.files) {
      imagesName.push(file.filename);
    }

    // // Make Itinerary to Array
    let day = req.body.trekkingDuration;
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

    // setting trekking
    const trekking = {
      Name: req.body.trekkingName,
      Place: req.body.trekkingPlace,
      Country: req.body.trekkingCountry,
      State: req.body.trekkingState,
      City: req.body.trekkingCity,
      Description: req.body.trekkingDescription,
      ShortDescription: req.body.trekkingShortDescription,
      Features: req.body.trekkingFeatures,
      Coordinates: {
        Longitude: req.body.trekkingLongitude,
        Latitude: req.body.trekkinglatitude,
      },
      Duration: req.body.trekkingDuration,
      Review: req.body.trekkingReview,
      Difficulty: req.body.trekkingDifficulty,
      Price: req.body.trekkingPrice,
      Discount: req.body.trekkingDiscount,
      Images: imagesName,
      Itinerary: itineraryArray,
    };

    // insert to database
    await trekkingModel.create(trekking);

    res.redirect('/agency/trekkings');
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('trekkingErr', error);
    res.redirect('/agency/trekkings/add');
  }
};

// All Trekings update page
exports.updateTrekkings = async (req, res, next) => {
  try {
    const alltrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(alltrekkings);
    trekkings.reverse();

    res.render('agency/updateTrekkings', { trekkings });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekkings update page
exports.updateTrekking = async (req, res, next) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);
    res.render('agency/updateTrekking', {
      trekking,
      updateErr: req.flash('updateErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekkings update Page(post)
exports.update = async (req, res, next) => {
  try {
    // Make Itinerary to Array
    let day = req.body.trekkingDuration;
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
      const image = await trekkingModel.findById(req.params.id);
      const imagePath = path.join(
        __dirname,
        '../',
        '../',
        'public/',
        'images/',
        'trekking/'
      );
      for (let i = 0; i < image.Images.length; i++) {
        fs.unlinkSync(`${imagePath}/${image.Images[i]}`);
      }
      await trekkingModel.updateOne(
        { _id: req.params.id },
        {
          Images: imagesName,
        }
      );
    }

    // Update the current Trekking
    await trekkingModel.updateOne(
      { _id: req.params.id },
      {
        Name: req.body.trekkingName,
        Place: req.body.trekkingPlace,
        Country: req.body.trekkingCountry,
        State: req.body.trekkingState,
        City: req.body.trekkingCity,
        Description: req.body.trekkingDescription,
        ShortDescription: req.body.trekkingShortDescription,
        Features: req.body.trekkingFeatures,
        Coordinates: {
          Longitude: req.body.trekkingLongitude,
          Latitude: req.body.trekkinglatitude,
        },
        Duration: req.body.trekkingDuration,
        Review: req.body.trekkingReview,
        Difficulty: req.body.trekkingDifficulty,
        Price: req.body.trekkingPrice,
        Discount: req.body.trekkingDiscount,
        Itinerary: itineraryArray,
      }
    );

    res.redirect('/agency/trekkings/update');
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('updateErr', error);
    res.redirect('back');
  }
};

// All Trekkings delete page
exports.deleteTours = async (req, res, next) => {
  try {
    const alltrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(alltrekkings);
    trekkings.reverse();

    res.render('agency/deleteTrekkings', { trekkings });
  } catch (err) {
    appError(req, res, next);
  }
};

// Trekkings delete page(post)
exports.delete = async (req, res, next) => {
  try {
    await trekkingModel.updateOne(
      { _id: req.params.id },
      {
        ItemDelete: true,
      }
    );
    res.redirect('/agency/trekkings/delete');
  } catch (err) {
    appError(req, res, next);
  }
};
