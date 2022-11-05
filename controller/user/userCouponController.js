const couponModel = require('./../../model/couponModel');

// coupon Checking(booking)
exports.bookingCouponChecking = async (req, res) => {
  try {
    const clientCoupon = req.body.coupon.toUpperCase();
    const coupon = await couponModel.findOne({ Name: clientCoupon });
    if (!coupon) {
      req.session.bookingMsg = 'Coupon is not Existed';

      res.redirect('back');
    } else {
      req.session.bookingMsg = coupon;
      req.flash('bookingMsg', coupon);
      res.redirect('back');
    }
  } catch (err) {
    console.log(err);
  }
};

// coupon Checking(Orders)
exports.orderCouponChecking = async (req, res) => {
  try {
    const clientCoupon = req.body.coupon.toUpperCase();
    const coupon = await couponModel.findOne({ Name: clientCoupon });
    if (!coupon) {
      req.flash('orderMsg', 'Coupon is not Existed');

      res.redirect('back');
    } else {
      req.flash('orderMsg', coupon);
      res.redirect('back');
    }
  } catch (err) {
    console.log(err);
  }
};
