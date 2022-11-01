const bookingsModel = require('./../../model/bookingsModel');
const userModel = require('./../../model/userModel');
const razoPayment = require('./../../utils/razoPayment');

// To add Bookkings
exports.bookings = async (req, res) => {
  try {
    // find user name
    const user = await userModel.findById(req.params.userId);

    // Payment integration
    const order = await razoPayment(req.body.BookingTotal * 100);

    // Create document
    const booking = await bookingsModel.create({
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
      Price: req.body.bookingPrice,
      TotalPrice: req.body.BookingTotal,
      discount: req.body.bookingDiscount,
    });

    // Send Response to razopayment
    res.json({
      orderId: order.id,
      price: req.body.BookingTotal,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      contact: user.contact,
      bookingId: booking._id,
    });
  } catch (err) {
    console.log(err);
  }
};

// IF Payment Success
exports.successPage = async (req, res) => {
  await bookingsModel.updateOne(
    { _id: req.params.id },
    {
      Payment: 'Complete',
    }
  );
  res.json({
    status: true,
  });
};

// If Payment failed
exports.falied = async (req, res) => {
  await bookingsModel.deleteOne({ _id: req.params.id });
  res.json({
    status: true,
  });
};
