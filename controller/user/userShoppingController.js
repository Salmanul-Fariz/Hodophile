const shoppingsModel = require('./../../model/shoppingsModel');
const shoppingCategoryModel = require('./../../model/shoppingCategoryModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const { find } = require('../../model/destinationsModel');

// Shopping Page
exports.shoppingPage = async (req, res) => {
  try {
    const categories = await shoppingCategoryModel.find({});
    const products = await shoppingsModel.find({});
    res.render('user/shoppings', { categories, products });
  } catch (err) {
    console.log(err);
  }
};

// Shopping Product Details
exports.shoppingDetailsPage = async (req, res) => {
  try {
    const product = await shoppingsModel.findById(req.params.id);
    res.render('user/shoppingsDetails', { product });
  } catch (err) {
    console.log(err);
  }
};
