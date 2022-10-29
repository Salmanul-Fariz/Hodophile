const bookingsModel = require('./../../model/bookingsModel');
const userModel = require('./../../model/userModel');

// To add Bookkings
exports.bookings = async (req, res) => {
  try {
    // find user name
    const user = await userModel.findById(req.params.userId);

    // Create document
    await bookingsModel.create({
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
      Price: req.session.bookingPrice,
      TotalPrice: req.session.BookingTotal,
      discount: req.session.bookingDiscount,
    });

    req.flash('bookingPopup', true);

    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};
