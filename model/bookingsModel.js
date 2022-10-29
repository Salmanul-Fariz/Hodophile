const mongoos = require('mongoose');

const bookingsSchema = new mongoos.Schema({
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
  Travelers: {
    type: Number,
    required: [true, 'Please Enter Travelers !'],
  },
  Category: {
    type: String,
    required: [true, 'Please Enter Category !'],
  },
  PackageId: {
    type: String,
    required: [true, 'Please Enter PackageId !'],
  },
  Payment: {
    type: String,
    default: 'Pending',
  },
  DateBooking: {
    type: String,
  },
  Price:{
    type:Number,
    required: [true, 'Please Enter Price !'],
  },
  TotalPrice:{
    type:Number,
    required: [true, 'Please Enter Total  Price !'],
  },
  discount:{
    type:Number,
    required: [true, 'Please Enter Discount !'],
  },
});

const bookingsModel = mongoos.model('Booking', bookingsSchema);

module.exports = bookingsModel;
