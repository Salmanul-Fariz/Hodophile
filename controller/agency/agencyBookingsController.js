const bookingsModel = require('./../../model/bookingsModel');
const bookingApproval = require('./../../utils/bookingApproval');

// Bookings page
exports.bookingsPage = async (req, res) => {
  try {
    const bookings = await bookingsModel.find({});
    bookings.reverse();
    res.render('agency/viewBookings', { bookings });
  } catch (err) {
    console.log(err);
  }
};

// Booking Details
exports.booking = async (req, res) => {
  try {
    const booking = await bookingsModel.findById(req.params.id);
    res.render('agency/viewBooking', { booking });
  } catch (err) {
    console.log(err);
  }
};

// Booking Approved
exports.approved = async (req, res) => {
  try {
    await bookingsModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Approved',
      }
    );

    // // Sending mail
    // bookingApproval.emailSender(
    //   req.params.userEmail,
    //   req.params.packageCategory,
    //   'Approved'
    // );

    // // Sending SMS
    // bookingApproval.smsSender(
    //   req.params.userContact,
    //   req.params.packageCategory,
    //   'Approved'
    // );

    res.redirect('/agency/bookings');
  } catch (err) {
    console.log(err);
  }
};

// Booking Cancelled
exports.cancelled = async (req, res) => {
  try {
    await bookingsModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Cancelled',
      }
    );

    // // Sending mail
    // bookingApproval.emailSender(
    //   req.params.userEmail,
    //   req.params.packageCategory,
    //   'Cancelled'
    // );

    // // Sending SMS
    // bookingApproval.smsSender(
    //   req.params.userContact,
    //   req.params.packageCategory,
    //   'Cancelled'
    // );

    res.redirect('/agency/bookings');
  } catch (err) {
    console.log(err);
  }
};

// Approved Page
exports.approvedPage = async (req, res) => {
  try {
    const approved = await bookingsModel.find({ Status: 'Approved' });
    approved.reverse();

    res.render('agency/viewApproval', { approved });
  } catch (err) {
    console.log(err);
  }
};

// Cancelled Page
exports.cancelledPage = async (req, res) => {
  try {
    const cancelled = await bookingsModel.find({ Status: 'Cancelled' });
    cancelled.reverse();

    res.render('agency/viewCancelled', { cancelled });
  } catch (err) {
    console.log(err);
  }
};
