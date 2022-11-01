const orderModel = require('./../../model/orderModel');
const orderApproval = require('./../../utils/orderApproval');

// Order page
exports.ordersPage = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.render('agency/viewOrders', { orders });
  } catch (err) {
    console.log(err);
  }
};

// order Details
exports.orderDetails = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    res.render('agency/viewOrder', { order });
  } catch (err) {
    console.log(err);
  }
};

// Booking Approved
exports.approved = async (req, res) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Approved',
      }
    );

    // // Sending mail
    // orderApproval.emailSender(req.params.userEmail, 'Approved');

    // // Sending SMS
    // orderApproval.smsSender(req.params.userContact, 'Approved');

    res.redirect('/agency/orders');
  } catch (err) {
    console.log(err);
  }
};

// order shipped
exports.shipped = async (req, res) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Shipped',
      }
    );

    // // Sending mail
    // orderApproval.emailSender(req.params.userEmail, 'Shipped');

    // // Sending SMS
    // orderApproval.smsSender(req.params.userContact, 'Shipped');

    res.redirect('/agency/orders');
  } catch (err) {
    console.log(err);
  }
};

// order delivery
exports.Deliverd = async (req, res) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Delivered',
        PaymentStatus: 'Completed',
      }
    );

    // // Sending mail
    // orderApproval.emailSender(req.params.userEmail, 'Delivered');

    // // Sending SMS
    // orderApproval.smsSender(req.params.userContact, 'Delivered');

    res.redirect('/agency/orders');
  } catch (err) {
    console.log(err);
  }
};

// order Cancelled
exports.cancelled = async (req, res) => {
  try {
    await orderModel.updateOne(
      { _id: req.params.id },
      {
        Status: 'Cancelled',
      }
    );

    // // Sending mail
    // orderApproval.emailSender(req.params.userEmail, 'Cancelled');

    // // Sending SMS
    // orderApproval.smsSender(req.params.userContact, 'Cancelled');

    res.redirect('/agency/orders');
  } catch (err) {
    console.log(err);
  }
};

// Approved Page
exports.approvedPage = async (req, res) => {
  try {
    const approved = await orderModel.find({ Status: 'Approved' });

    res.render('agency/viewOrderApproval', { approved });
  } catch (err) {
    console.log(err);
  }
};

// Shipped Page
exports.shippedPage = async (req, res) => {
  try {
    const shipped = await orderModel.find({ Status: 'Shipped' });

    res.render('agency/viewOrderShipped', { shipped });
  } catch (err) {
    console.log(err);
  }
};

// Delivered Page
exports.deliveryPage = async (req, res) => {
  try {
    const delivered = await orderModel.find({ Status: 'Delivered' });

    res.render('agency/viewOrderDelivered', { delivered });
  } catch (err) {
    console.log(err);
  }
};

// Cancelled Page
exports.cancelledPage = async (req, res) => {
  try {
    const cancelled = await orderModel.find({ Status: 'Cancelled' });

    res.render('agency/viewOrderCancelled', { cancelled });
  } catch (err) {
    console.log(err);
  }
};
