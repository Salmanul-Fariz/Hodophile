const mongoos = require('mongoose');

const wishlistSchema = new mongoos.Schema({
  UserId: {
    type: String,
    required: [true, 'Please Enter User Id !'],
  },
  Products: {
    type: Array,
    required: [true, 'Please Enter Products !'],
  },
});

const wishlistModel = mongoos.model('wishlist', wishlistSchema);

module.exports = wishlistModel;
