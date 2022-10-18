const trekkingModel = require('./../../model/trekkingModel');
const checkItemDelete = require('./../../utils/checkItemDelete');

// Trekkings page
exports.trekkings = async (req, res) => {
  try {
    const allTrekkings = await trekkingModel.find({});
    const trekkings = checkItemDelete(allTrekkings);

    // To Google Map Setup
    const coordinates = [];
    for (let el of trekkings) {
      let x = [];
      x.push(el.Coordinates.Longitude);
      x.push(el.Coordinates.Latitude);
      coordinates.push(x);
    }

    res.render('user/trekkings', { trekkings, coordinates });
  } catch (err) {
    console.log(err);
  }
};

// Trekking details page
exports.details = async (req, res) => {
  try {
    const trekking = await trekkingModel.findById(req.params.id);

    res.render('user/trekkingsDetails', { trekking });
  } catch (err) {
    console.log(err);
  }
};
