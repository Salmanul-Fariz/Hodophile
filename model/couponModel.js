const mongoos = require('mongoose');

const couponSchema = new mongoos.Schema({
  Name: {
    type: String,
    required: [true, 'Please Enter Coupen Name !'],
  },
  Discount: {
    type: Number,
    required: [true, 'Please Enter Discount !'],
  },
});

const couponsModel = mongoos.model('Coupon', couponSchema);

module.exports = couponsModel;
