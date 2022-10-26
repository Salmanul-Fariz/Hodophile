const mongoos = require('mongoose');

const newsSchema = new mongoos.Schema({
  Title: {
    type: String,
    required: [true, 'Please Enter Titile!'],
  },
  Place: {
    type: String,
    required: [true, 'Please Enter Place !'],
  },
  ShortDescription: {
    type: String,
    required: [true, 'Please Enter Short Description !'],
  },
  Image:String,
  Date: {
    type: Date,
    default: Date.now(),
  },
  Like: {
    type: Number,
    default: 0,
  },
});

const newsModel = mongoos.model('news', newsSchema);

module.exports = newsModel;
