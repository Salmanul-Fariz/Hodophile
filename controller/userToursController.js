const destinationsModel = require('./../model/destinationsModel');
const checkItemDelete = require('./../utils/checkItemDelete');

// Tours page
exports.tours = async (req, res) => {
  try {
    const allTours = await destinationsModel.find({});
    const tours = checkItemDelete(allTours);

    // To Google Map Setup
    const coordinates = [];
    for (let el of tours) {
      let x = [];
      x.push(el.Coordinates.Longitude);
      x.push(el.Coordinates.Latitude);
      coordinates.push(x);
    }

    res.render('user/tours', { tours, coordinates });
  } catch (err) {
    console.log(err);
  }
};

// Tours details page
exports.details = async (req, res) => {
  try {
    const tour = await destinationsModel.findById(req.params.id);

    res.render('user/toursDetails', { tour });
  } catch (err) {
    console.log(err);
  }
};
