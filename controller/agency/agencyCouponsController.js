const couponModel = require('./../../model/couponModel');

// Coupon Page
exports.coupenPage = async (req, res) => {
  try {
    const coupons = await couponModel.find({});
    coupons.reverse();

    res.render('agency/viewCoupons', { coupons });
  } catch (err) {
    console.log(err);
  }
};

// Add Coupon Page
exports.addCouponPage = async (req, res) => {
  try {
    res.render('agency/addCoupen');
  } catch (err) {
    console.log(err);
  }
};

// Add Coupon (post)
exports.addCoupon = async (req, res) => {
  try {
    let Coupon = req.body.coupon.toUpperCase();
    await couponModel.create({
      Name: Coupon,
      Discount: req.body.discount,
    });

    res.redirect('/agency/coupons');
  } catch (err) {
    console.log(err);
  }
};

// Delete Coupons
exports.deleteCoupon = async (req, res) => {
  try {
    await couponModel.findByIdAndDelete(req.params.id);
    res.redirect('/agency/coupons');
  } catch (err) {
    console.log(err);
  }
};
