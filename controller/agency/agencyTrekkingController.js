const trekkingModel = require('./../../model/trekkingModel');
const mongoosErr = require('./../../utils/mongoosErr');
const checkItemDelete = require('./../../utils/checkItemDelete');

const fs = require('fs');
const path = require('path');

// All Trekking View page
exports.trekkings = async (req, res) => {
  try {
    const alltrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(alltrekkings);
    res.render('agency/viewTrekkings', { trekkings });
  } catch (err) {
    console.log(err);
  }
};

// Trekking Page
exports.trekking = async (req, res) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);
    res.render('agency/viewTrekking', { trekking });
  } catch (err) {
    console.log(err);
  }
};

// Trekking add page
exports.add = (req, res) => {
  try {
    res.render('agency/addTrekkings', {
      trekkingErr: req.flash('trekkingErr'),
    });
  } catch (err) {
    console.log(err);
  }
};

// Trekking Add (post)
exports.addPost = async (req, res) => {
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

    // Make features to Array
    const length = req.body.trekkingFeatures.length;
    let featureArray = [];
    let j = 0;
    while (j < length) {
      j++;
      featureArray.push(req.body.trekkingFeatures[j - 1]);
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
      Features: featureArray,
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
    console.log(err);
    let error = mongoosErr(err);
    req.flash('trekkingErr', error);
    res.redirect('/agency/trekkings/add');
  }
};

// All Trekings update page
exports.updateTrekkings = async (req, res) => {
  try {
    const alltrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(alltrekkings);
    res.render('agency/updateTrekkings', { trekkings });
  } catch (err) {
    console.log(err);
  }
};

// Trekkings update page
exports.updateTrekking = async (req, res) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);
    res.render('agency/updateTrekking', {
      trekking,
      updateErr: req.flash('updateErr'),
    });
  } catch (err) {
    console.log(err);
  }
};

// Trekkings update Page(post)
exports.update = async (req, res) => {
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
      await trekkingModel.updateOne({_id:req.params.id}, {
        Images: imagesName,
      });
    }

    // Update the current Trekking
    await trekkingModel.updateOne({_id:req.params.id}, {
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
    });

    res.redirect('/agency/trekkings/update');
  } catch (err) {
    console.log(err);
    let error = mongoosErr(err);
    req.flash('updateErr', error);
    res.redirect('back');
  }
};

// All Trekkings delete page
exports.deleteTours = async (req, res) => {
  try {
    const alltrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(alltrekkings);
    res.render('agency/deleteTrekkings', { trekkings });
  } catch (err) {
    console.log(err);
  }
};

// Trekkings delete page(post)
exports.delete = async (req, res) => {
  try {
    await trekkingModel.updateOne({_id:req.params.id}, {
      ItemDelete: true,
    });
    res.redirect('/agency/trekkings/delete');
  } catch (err) {
    console.log(err);
  }
};
