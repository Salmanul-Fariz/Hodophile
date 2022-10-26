const mongoos = require('mongoose');

const shoppingsCategorySchema = new mongoos.Schema({
  Name: {
    type: String,
    required: [true, 'Please Enter Category Name !'],
  },
});

const shoppingsCategoryModel = mongoos.model(
  'ShoppingCategory',
  shoppingsCategorySchema
);

module.exports = shoppingsCategoryModel;
