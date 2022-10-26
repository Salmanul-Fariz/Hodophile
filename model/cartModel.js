const mongoos = require('mongoose');

const cartsSchema = new mongoos.Schema({
  UserId: {
    type: String,
    required: [true, 'Please Enter User Id !'],
  },
  Products: {
    type: Array,
    required: [true, 'Please Enter Products !'],
  },
});

const cartModel = mongoos.model('carts', cartsSchema);

module.exports = cartModel;
