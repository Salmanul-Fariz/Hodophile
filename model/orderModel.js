const mongoos = require('mongoose');

const orderSchema = new mongoos.Schema({
  Date: {
    type: String,
    default: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
  },
  Status: {
    type: String,
    default: 'Pending',
  },
  User: {
    UserId: {
      type: String,
      required: [true, 'Please Enter User Id !'],
    },
    Name: {
      type: String,
      required: [true, 'Please Enter Name !'],
    },
    Contact: {
      type: Number,
      required: [true, 'Please Enter Contact !'],
    },
    Email: {
      type: String,
      required: [true, 'Please Enter Email !'],
    },
  },
  PaymentStatus: {
    type: String,
    default: 'Pending',
  },
  PaymentMethod: {
    type: String,
    required: [true, 'Please Enter Payment Method !'],
  },
  Order: {
    type: Array,
    required: [true, 'Please Enter Order Details !'],
  },
  Price: {
    type: Number,
    required: [true, 'Please Enter Price !'],
  },
  TotalPrice: {
    type: Number,
    required: [true, 'Please Enter Total  Price !'],
  },
  Discount: {
    type: Number,
    required: [true, 'Please Enter Discount !'],
  },
  Address: {
    type: Array,
    required: [true, 'Please Enter Address !'],
  },
});

const ordersModel = mongoos.model('Order', orderSchema);

module.exports = ordersModel;
