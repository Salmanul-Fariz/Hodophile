const Razorpay = require('razorpay');

// config file setup
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const instance = new Razorpay({
  key_id: process.env.RAZO_PAYMENT_KEY_ID,
  key_secret: process.env.RAZO_PAYMENT_KEY_SECRET,
});

module.exports = async (price) => {
  const options = {
    amount: price, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };
  return await instance.orders.create(options);
};
