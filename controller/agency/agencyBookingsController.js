const bookingsModel = require('./../../model/bookingsModel');
const bookingApproval = require('./../../utils/bookingApproval');
const appError = require('./../../middleware/appError');

// Bookings page
exports.bookingsPage = async (req, res, next) => {
  try {
    const bookings = await bookingsModel.find({});
    bookings.reverse();
    res.render('agency/viewBookings', { bookings });
  } catch (err) {
    appError(req, res, next);
  }
};

// Booking Details
exports.booking = async (req, res, next) => {
  try {
    const booking = await bookingsModel.findById(req.params.id);
    res.render('agency/viewBooking', { booking });
  } catch (err) {
    appError(req, res, next);
  }
};

// Booking Approved
exports.approved = async (req, res, next) => {
  try {
    await bookingsModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Approved',
      }
    );

    // Sending mail
    bookingApproval.emailSender(
      req.params.userEmail,
      req.params.packageCategory,
      'Approved'
    );

    // Sending SMS
    bookingApproval.smsSender(
      req.params.userContact,
      req.params.packageCategory,
      'Approved'
    );

    res.redirect('/agency/bookings');
  } catch (err) {
    appError(req, res, next);
  }
};

// Booking Cancelled
exports.cancelled = async (req, res, next) => {
  try {
    await bookingsModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Cancelled',
      }
    );

    // Sending mail
    bookingApproval.emailSender(
      req.params.userEmail,
      req.params.packageCategory,
      'Cancelled'
    );

    // Sending SMS
    bookingApproval.smsSender(
      req.params.userContact,
      req.params.packageCategory,
      'Cancelled'
    );

    res.redirect('/agency/bookings');
  } catch (err) {
    appError(req, res, next);
  }
};

// Approved Page
exports.approvedPage = async (req, res, next) => {
  try {
    const approved = await bookingsModel.find({ Status: 'Approved' });
    approved.reverse();

    res.render('agency/viewApproval', { approved });
  } catch (err) {
    appError(req, res, next);
  }
};

// Cancelled Page
exports.cancelledPage = async (req, res, next) => {
  try {
    const cancelled = await bookingsModel.find({ Status: 'Cancelled' });
    cancelled.reverse();

    res.render('agency/viewCancelled', { cancelled });
  } catch (err) {
    appError(req, res, next);
  }
};
