const shoppingsModel = require('./../../model/shoppingsModel');
const shoppingCategoryModel = require('./../../model/shoppingCategoryModel');
const checkItemDelete = require('./../../utils/checkItemDelete');
const mongoosErr = require('./../../utils/mongoosErr');
const appError = require('./../../middleware/appError');

const fs = require('fs');
const path = require('path');

// Shoppings page
exports.shoppings = async (req, res, next) => {
  try {
    const allProducts = await shoppingsModel.find({});
    const products = checkItemDelete(allProducts);
    products.reverse();

    res.render('agency/viewShoppings', { products });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings Details Page
exports.shoppingsDetails = async (req, res, next) => {
  try {
    const product = await shoppingsModel.findById(req.params.id);
    res.render('agency/viewShopping', { product });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings category
exports.viewCategory = async (req, res, next) => {
  try {
    const categories = await shoppingCategoryModel.find({});
    categories.reverse();

    res.render('agency/viewCategory', {
      categories,
      categoryErr: req.flash('categoryErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings category Add
exports.addCategory = async (req, res, next) => {
  try {
    res.render('agency/addCategory', { categoryErr: req.flash('categoryErr') });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings category Add(post)
exports.category = async (req, res, next) => {
  try {
    const category = await shoppingCategoryModel.findOne({
      Name: req.body.shoppingCategory,
    });
    if (category) {
      req.flash('categoryErr', 'Please Use Another Category !');
      res.redirect('/agency/shoppings/category/add');
    } else {
      await shoppingCategoryModel.create({ Name: req.body.shoppingCategory });
      res.redirect('/agency/shoppings/category');
    }
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('categoryErr', error);
    res.redirect('/agency/shoppings/category/add');
  }
};

// Shopping Category Delete
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await shoppingCategoryModel.findById(req.params.id);
    const product = await shoppingsModel.find({ Category: category.Name });
    if (product.length !== 0) {
      req.flash('categoryErr', `Can't Delete Category !`);
      res.redirect('/agency/shoppings/category');
    } else {
      await shoppingCategoryModel.deleteOne({ _id: req.params.id });
      res.redirect('/agency/shoppings/category');
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings Add
exports.viewAddShoppings = async (req, res, next) => {
  try {
    const categories = await shoppingCategoryModel.find({});
    res.render('agency/addShoppings', {
      categories,
      shoppingErr: req.flash('shoppingErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings Add(post)
exports.addShoppings = async (req, res, next) => {
  try {
    // Make image path to Array
    let imagesName = [];
    for (file of req.files) {
      imagesName.push(file.filename);
    }

    // Add To DataBase
    await shoppingsModel.create({
      Name: req.body.shoppingName,
      ShortName: req.body.shoppingShortName,
      Category: req.body.shoppingCategory,
      ShortDescription: req.body.shoppingShortDescription,
      Highlights: req.body.shoppingHighlights,
      Specifications: req.body.shoppingSpecifications,
      Review: req.body.shoppingReview,
      Price: req.body.ShoppingPrice,
      Discount: req.body.shoppingDiscount,
      Images: imagesName,
    });

    res.redirect('/agency/shoppings');
  } catch (err) {
    let error = mongoosErr(err);
    req.flash('shoppingErr', error);
    res.redirect('/agency/shopping/add');
  }
};

// Shoppings update list
exports.updateShoppings = async (req, res, next) => {
  try {
    const products = await shoppingsModel.find({});
    res.render('agency/updateShoppings', { products });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings Update
exports.updateShopping = async (req, res, next) => {
  try {
    const categories = await shoppingCategoryModel.find({});
    categories.reverse();
    const product = await shoppingsModel.findById(req.params.id);
    res.render('agency/updateShoping', {
      product,
      categories,
      shoppingErr: req.flash('shoppingErr'),
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shoppings Update(post)
exports.update = async (req, res, next) => {
  try {
    // When image update
    if (req.files.length !== 0) {
      // Make image path to Array
      let imagesName = [];
      for (file of req.files) {
        imagesName.push(file.filename);
      }

      // delete old image add new image path to database
      const image = await shoppingsModel.findById(req.params.id);
      const imagePath = path.join(
        __dirname,
        '/',
        '../',
        '../',
        'public/',
        'images/',
        'shopping/'
      );
      for (let i = 0; i < image.Images.length; i++) {
        fs.unlink(`${imagePath}/${image.Images[i]}`, () => {});
      }
      await shoppingsModel.updateOne(
        { _id: req.params.id },
        {
          Images: imagesName,
        }
      );
    }

    // Update the current Shopping
    await shoppingsModel.updateOne(
      { _id: req.params.id },
      {
        Name: req.body.shoppingName,
        ShortName: req.body.shoppingShortName,
        Category: req.body.shoppingCategory,
        ShortDescription: req.body.shoppingShortDescription,
        Highlights: req.body.shoppingHighlights,
        Specifications: req.body.shoppingSpecifications,
        Review: req.body.shoppingReview,
        Price: req.body.ShoppingPrice,
        Discount: req.body.shoppingDiscount,
      }
    );
    res.redirect('/agency/shoppings/update');
  } catch (err) {
    appError(req, res, next);
  }
};

// All Shoppings delete page
exports.deleteShoppings = async (req, res, next) => {
  try {
    const allShoppings = await shoppingsModel.find({});
    const products = checkItemDelete(allShoppings);
    products.reverse();

    res.render('agency/deleteshoppings', { products });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shopping delete page(post)
exports.delete = async (req, res, next) => {
  try {
    await shoppingsModel.updateOne(
      { _id: req.params.id },
      {
        ItemDelete: true,
      }
    );
    res.redirect('/agency/shoppings/delete');
  } catch (err) {
    appError(req, res, next);
  }
};
