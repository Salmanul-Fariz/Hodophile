const orderModel = require('./../../model/orderModel');
const orderApproval = require('./../../utils/orderApproval');
const appError = require('./../../middleware/appError');

// Order page
exports.ordersPage = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    orders.reverse();

    res.render('agency/viewOrders', { orders });
  } catch (err) {
    appError(req, res, next);
  }
};

// order Details
exports.orderDetails = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    res.render('agency/viewOrder', { order });
  } catch (err) {
    appError(req, res, next);
  }
};

// Booking Approved
exports.approved = async (req, res, next) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Approved',
      }
    );

    // Sending mail
    orderApproval.emailSender(req.params.userEmail, 'Approved');

    // Sending SMS
    orderApproval.smsSender(req.params.userContact, 'Approved');

    res.redirect('/agency/orders');
  } catch (err) {
    appError(req, res, next);
  }
};

// order shipped
exports.shipped = async (req, res, next) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Shipped',
      }
    );

    // Sending mail
    orderApproval.emailSender(req.params.userEmail, 'Shipped');

    // Sending SMS
    orderApproval.smsSender(req.params.userContact, 'Shipped');

    res.redirect('/agency/orders');
  } catch (err) {
    appError(req, res, next);
  }
};

// order delivery
exports.Deliverd = async (req, res, next) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Delivered',
        PaymentStatus: 'Completed',
      }
    );

    // Sending mail
    orderApproval.emailSender(req.params.userEmail, 'Delivered');

    // Sending SMS
    orderApproval.smsSender(req.params.userContact, 'Delivered');

    res.redirect('/agency/orders');
  } catch (err) {
    appError(req, res, next);
  }
};

// order Cancelled
exports.cancelled = async (req, res, next) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Cancelled',
      }
    );

    // Sending mail
    orderApproval.emailSender(req.params.userEmail, 'Cancelled');

    // Sending SMS
    orderApproval.smsSender(req.params.userContact, 'Cancelled');

    res.redirect('/agency/orders');
  } catch (err) {
    appError(req, res, next);
  }
};

// Approved Page
exports.approvedPage = async (req, res, next) => {
  try {
    const approved = await orderModel.find({ Status: 'Approved' });
    approved.reverse();

    res.render('agency/viewOrderApproval', { approved });
  } catch (err) {
    appError(req, res, next);
  }
};

// Shipped Page
exports.shippedPage = async (req, res, next) => {
  try {
    const shipped = await orderModel.find({ Status: 'Shipped' });
    shipped.reverse();

    res.render('agency/viewOrderShipped', { shipped });
  } catch (err) {
    appError(req, res, next);
  }
};

// Delivered Page
exports.deliveryPage = async (req, res, next) => {
  try {
    const delivered = await orderModel.find({ Status: 'Delivered' });
    delivered.reverse();

    res.render('agency/viewOrderDelivered', { delivered });
  } catch (err) {
    appError(req, res, next);
  }
};

// Cancelled Page
exports.cancelledPage = async (req, res, next) => {
  try {
    const cancelled = await orderModel.find({ Status: 'Cancelled' });
    cancelled.reverse();

    res.render('agency/viewOrderCancelled', { cancelled });
  } catch (err) {
    appError(req, res, next);
  }
};
