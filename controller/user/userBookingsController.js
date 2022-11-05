const bookingsModel = require('./../../model/bookingsModel');
const couponModel = require('./../../model/couponModel');
const destinationsModel = require('./../../model/destinationsModel');
const trekkingModel = require('./../../model/trekkingModel');
const userModel = require('./../../model/userModel');
const razoPayment = require('./../../utils/razoPayment');

// To add Bookkings
exports.bookings = async (req, res) => {
  try {
    // find user name
    const user = await userModel.findById(req.params.userId);
    let packageTotal, packageDiscount, packagePrice;
    if (req.params.packageCategory === 'Tour') {
      let package = await destinationsModel.findById(req.params.packageId);
      packagePrice = package.Price;
      if (req.body.bookingCoupon === 'false') {
        packageDiscount = Math.round((package.Price / 100) * package.Discount);
        packageTotal = packagePrice - packageDiscount;
      } else {
        packageDiscount = Math.round((package.Price / 100) * package.Discount);
        packageTotal = packagePrice - packageDiscount;

        const coupon = await couponModel.findById(req.body.bookingCoupon);
        let couponDiscount = Math.round((packageTotal / 100) * coupon.Discount);
        packageDiscount += couponDiscount;
        packageTotal -= couponDiscount;
        req.session.bookingCoupon = coupon._id;
      }
    } else {
      let package = await trekkingModel.findById(req.params.packageId);
      packagePrice = package.Price;
      if (req.body.bookingCoupon === 'false') {
        packageDiscount = Math.round((package.Price / 100) * package.Discount);
        packageTotal = packagePrice - packageDiscount;
      } else {
        packageDiscount = Math.round((package.Price / 100) * package.Discount);
        packageTotal = packagePrice - packageDiscount;

        const coupon = await couponModel.findById(req.body.bookingCoupon);
        let couponDiscount = Math.round((packageTotal / 100) * coupon.Discount);
        packageDiscount += couponDiscount;
        packageTotal -= couponDiscount;
        req.session.bookingCoupon = coupon._id;
      }
    }

    // Payment integration
    const order = await razoPayment(packageTotal * 100);

    // Create document
    req.session.booking = {
      User: {
        UserId: req.params.userId,
        Name: `${user.firstName} ${user.lastName}`,
        Contact: req.body.bookingContact,
        Email: req.body.bookingEmail,
      },
      Travelers: req.body.bookingTravallers,
      Category: req.params.packageCategory,
      PackageId: req.params.packageId,
      DateBooking: req.body.bookingDate,
      Price: packagePrice,
      TotalPrice: packageTotal,
      discount: packageDiscount,
      Payment: 'Complete',
    };

    // Send Response to razopayment
    res.json({
      orderId: order.id,
      price: packageTotal,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      contact: user.contact,
    });
  } catch (err) {
    console.log(err);
  }
};

// If Payment Success
exports.successPage = async (req, res) => {
  try {
    await bookingsModel.create(req.session.booking);
    if (req.session.bookingCoupon) {
      await couponModel.deleteOne({ _id: req.session.bookingCoupon });
      req.session.bookingCoupon = null;
    }
    req.session.booking = null;
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// If Payment failed
exports.falied = async (req, res) => {
  try {
    req.session.booking = null;
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};
