const mongoos = require('mongoose');

const shoppingSchema = new mongoos.Schema({
  Name: {
    type: String,
    required: [true, 'Please Enter Shopping Name !'],
  },
  ShortName: {
    type: String,
    required: [true, 'Please Enter Short Name !'],
  },
  Category: {
    type: String,
    required: [true, 'Please Enter Category !'],
  },
  ShortDescription: {
    type: String,
    required: [true, 'Please Enter Short Description !'],
  },
  Highlights: {
    type: Array,
    required: [true, 'Please Add Highlight !'],
  },
  Specifications: {
    type: Array,
    required: [true, 'Please Add Specifications !'],
  },
  Review: {
    type: Number,
    required: [true, 'Please Enter Review Rate !'],
  },
  Price: {
    type: Number,
    required: [true, 'Please Enter Price !'],
  },
  Discount: {
    type: Number,
    default: 0,
  },
  Images: {
    type: Array,
    required: [true, 'Please Add Images Path !'],
  },
  ItemDelete: {
    type: Boolean,
    default: false,
  },
});

const Shopping = mongoos.model('shopping', shoppingSchema);

module.exports = Shopping;
