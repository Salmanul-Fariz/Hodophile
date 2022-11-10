const couponModel = require('./../../model/couponModel');
const appError = require('./../../middleware/appError');

// Coupon Page
exports.coupenPage = async (req, res, next) => {
  try {
    const coupons = await couponModel.find({});
    coupons.reverse();

    res.render('agency/viewCoupons', { coupons });
  } catch (err) {
    appError(req, res, next);
  }
};

// Add Coupon Page
exports.addCouponPage = async (req, res, next) => {
  try {
    res.render('agency/addCoupen');
  } catch (err) {
    appError(req, res, next);
  }
};

// Add Coupon (post)
exports.addCoupon = async (req, res, next) => {
  try {
    let Coupon = req.body.coupon.toUpperCase();
    await couponModel.create({
      Name: Coupon,
      Discount: req.body.discount,
    });

    res.redirect('/agency/coupons');
  } catch (err) {
    appError(req, res, next);
  }
};

// Delete Coupons
exports.deleteCoupon = async (req, res, next) => {
  try {
    await couponModel.findByIdAndDelete(req.params.id);
    res.redirect('/agency/coupons');
  } catch (err) {
    appError(req, res, next);
  }
};
