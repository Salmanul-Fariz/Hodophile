const orderModel = require('./../../model/orderModel');
const bookingsModel = require('./../../model/bookingsModel');
const destinationsModel = require('./../../model/destinationsModel');
const trekkingModel = require('./../../model/trekkingModel');
const newsModel = require('./../../model/newsModel');
const shoppingsModel = require('./../../model/shoppingsModel');
const userModel = require('./../../model/userModel');
const appError = require('./../../middleware/appError');

// Home page(get)
exports.dashboardPage = async (req, res, next) => {
  try {
    // current year
    let year = new Date().toISOString().split('-')[0];
    // Total Revenue of orders
    const orders = await orderModel.aggregate([
      { $match: { PaymentStatus: 'Completed' } },
      {
        $match: {
          Date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: { _id: 'Revenue', Total: { $sum: '$TotalPrice' } },
      },
    ]);

    // total Revenue of Bookings
    const Booking = await bookingsModel.aggregate([
      { $match: { Payment: 'Complete' } },
      {
        $match: {
          Date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: { _id: 'Revenue', Total: { $sum: '$TotalPrice' } },
      },
    ]);

    // Total Revenue
    const totalRevenue = orders[0].Total + Booking[0].Total;

    // Total Profilte in A year
    const totalProfite = Math.round((totalRevenue / 100) * 18);

    // Total Tour Packages
    const tours = await destinationsModel.aggregate([{ $count: 'Count' }]);

    // Total Treaking Packages
    const trekkings = await trekkingModel.aggregate([{ $count: 'Count' }]);

    // Total News Blogs
    const news = await newsModel.aggregate([{ $count: 'Count' }]);

    // Total Shoppings Products
    const products = await shoppingsModel.aggregate([{ $count: 'Count' }]);

    // Total Shoppings Products
    const users = await userModel.aggregate([{ $count: 'Count' }]);

    // Latest Bookings
    const latestBooking = await bookingsModel
      .find({})
      .populate('User.UserId')
      .populate('PackageId');

    latestBooking.reverse();

    // Latest Orders
    const latestOrders = await orderModel
      .find({})
      .populate('User.UserId')
      .populate('Order.ProductId');

    latestOrders.reverse();

    res.render('agency/dashboard', {
      totalRevenue,
      tourCount: tours[0].Count,
      trekkingCount: trekkings[0].Count,
      newsCount: news[0].Count,
      productsCount: products[0].Count,
      userCount: users[0].Count,
      profite: totalProfite,
      latestBooking,
      latestOrders,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// login pagee (get)
exports.login = (req, res, next) => {
  try {
    if (req.session.agency) {
      res.render('agency/home');
    } else {
      res.render('agency/login', { agencyErr: req.flash('agencyErr') });
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// log out (post)
exports.logout = (req, res, next) => {
  try {
    req.session.agency = null;
    res.redirect('/agency');
  } catch (err) {
    appError(req, res, next);
  }
};

// Take Data To Graph
exports.graph = async (req, res, next) => {
  try {
    // current year
    let year = new Date().toISOString().split('-')[0];

    // Total Revenue of orders By Monthly
    const orders = await orderModel.aggregate([
      { $match: { PaymentStatus: 'Completed' } },
      {
        $match: {
          Date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$Date' },
          total: { $sum: '$TotalPrice' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    // Total Revenue of bookings By Monthly
    const bookings = await bookingsModel.aggregate([
      { $match: { Payment: 'Complete' } },
      {
        $match: {
          Date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$Date' },
          total: { $sum: '$TotalPrice' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    // Add Two documents Total By monthly
    let total = [];

    for (let i = 1; i <= 12; i++) {
      let addTotal = 0;

      // order Array
      for (let j = 0; j < orders.length; j++) {
        if (orders[j].month === i) {
          addTotal += orders[j].total;
          break;
        }
      }

      // bookings Array
      for (let k = 0; k < bookings.length; k++) {
        if (bookings[k].month === i) {
          addTotal += bookings[k].total;
          break;
        }
      }
      total.push(addTotal);
    }
    res.json({
      total: total,
    });
  } catch (err) {
    appError(req, res, next);
  }
};
