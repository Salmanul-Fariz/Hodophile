const mongoos = require('mongoose');

const shoppingsCategorySchema = new mongoos.Schema({
  Name: {
    type: String,
    required: [true, 'Please Enter Category Name !'],
  },
});

const shoppingsCategory = mongoos.model(
  'ShoppingCategory',
  shoppingsCategorySchema
);

module.exports = shoppingsCategory;
