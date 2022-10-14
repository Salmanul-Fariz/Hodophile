const mongoos = require('mongoose');

const destinationSchema = new mongoos.Schema({
  Name: {
    type: String,
    required: [true, 'Please Enter Tour Name !'],
  },
  Place: {
    type: String,
    required: [true, 'Please Enter Tour Place !'],
  },
  Country: {
    type: String,
    required: [true, 'Please Enter Tour country !'],
  },
  State: {
    type: String,
    required: [true, 'Please Enter Tour State !'],
  },
  City: {
    type: String,
    required: [true, 'Please Enter Tour City !'],
  },
  Coordinates: {
    Logitude: {
      type: Number,
      required: [true, 'Please Enter Longitude !'],
    },
    Latitude: {
      type: Number,
      required: [true, 'Please Enter Latitude !'],
    },
  },
  Duration: {
    type: Number,
    required: [true, 'Please Enter Duration !'],
  },
  Review: {
    type: Number,
    required: [true, 'Please Enter Review Rate !'],
  },
  Difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy',
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
  Itinerary: {
    type: Array,
    required: [true, 'Please Enter itinerary !'],
  },
});

const destination = mongoos.model('Destination', destinationSchema);

module.exports = destination;
