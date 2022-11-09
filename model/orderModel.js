const mongoos = require('mongoose');

const orderSchema = new mongoos.Schema({
  Date: {
    type: Date,
    default: Date.now(),
  },
  Status: {
    type: String,
    default: 'Pending',
  },
  User: {
    UserId: {
      type: mongoos.Schema.Types.ObjectId,
      ref: 'User',
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
  Order: [
    {
      ProductId: { type: mongoos.Schema.Types.ObjectId, ref: 'shopping' },
      Quantity: Number,
      Price: Number,
    },
  ],
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
