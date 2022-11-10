const shoppingsModel = require('./../../model/shoppingsModel');
const orderModel = require('./../../model/orderModel');
const userModel = require('./../../model/userModel');
const cartModel = require('./../../model/cartModel');
const couponModel = require('./../../model/couponModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const razoPayment = require('./../../utils/razoPayment');
const appError = require('./../../middleware/appError');

// Order Page
exports.orderPage = async (req, res) => {
  try {
    // Came from Direct Click Product
    let product, cartCount, wishlistCount, user, cart;
    if (req.params.orderType === 'Product') {
      product = await shoppingsModel.findById(req.params.orderTypeId);
      cartCount = await cartItemCount(req.session.user);
      wishlistCount = await wishlistItemCount(req.session.user);
      user = await userModel.findById(req.params.userId);
    }
    // Came from Direct Click Cart
    else if (req.params.orderType === 'Cart') {
      cart = await cartModel
        .findById(req.params.orderTypeId)
        .populate('Products.productId');

      cartCount = await cartItemCount(req.session.user);
      wishlistCount = await wishlistItemCount(req.session.user);
      user = await userModel.findById(req.params.userId);
    }

    res.render('user/order', {
      cartCount,
      wishlistCount,
      product,
      couponsOpen: req.flash('orderMsg'),
      cart,
      user,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Add Address
exports.addAddress = async (req, res, next) => {
  try {
    await userModel.updateOne(
      { _id: req.params.userId },
      {
        $push: {
          Address: {
            Name: req.body.addressName,
            Address: req.body.address,
            Country: req.body.addressCountry,
            State: req.body.addressState,
            City: req.body.addressCity,
            PIN: req.body.addressPincode,
          },
        },
      }
    );
    res.redirect('back');
  } catch (err) {
    appError(req, res, next);
  }
};

// Order Submit
exports.orderSubmit = async (req, res, next) => {
  try {
    if (req.params.orderType === 'Product') {
      const user = await userModel.findById(req.params.userId);
      const product = await shoppingsModel.findById(req.params.orderTypeId);

      let proTotal, proDiscount, proPrice;
      if (req.body.orderCoupon === 'false') {
        proDiscount = Math.round(
          ((product.Price * req.body.productQuatity) / 100) * product.Discount
        );
        proPrice = product.Price * req.body.productQuatity;
        proTotal = proPrice - proDiscount;
      } else {
        proDiscount = Math.round((product.Price / 100) * product.Discount);
        proPrice = product.Price * req.body.productQuatity;
        proTotal = proPrice - proDiscount;

        const coupon = await couponModel.findById(req.body.orderCoupon);
        let couponDiscount = Math.round((proTotal / 100) * coupon.Discount);
        proDiscount += couponDiscount;
        proTotal -= couponDiscount;
        req.session.ordersCoupon = coupon._id;
      }

      if (req.body.deliveryType === 'Cash On Delivery') {
        await orderModel.create({
          User: {
            UserId: user._id,
            Name: `${user.firstName} ${user.lastName}`,
            Contact: user.contact,
            Email: user.email,
          },
          Price: proPrice,
          Discount: proDiscount,
          TotalPrice: proTotal,
          PaymentMethod: req.body.deliveryType,
          Order: {
            ProductId: product._id,
            Quantity: req.body.productQuatity,
            Price: product.Price,
          },
          Address: user.Address[req.body.addressIndex],
        });

        if (req.session.ordersCoupon) {
          await couponModel.deleteOne({ _id: req.session.ordersCoupon });
          req.session.ordersCoupon = null;
        }
      } else {
        req.session.orderCollection = {
          User: {
            UserId: user._id,
            Name: `${user.firstName} ${user.lastName}`,
            Contact: user.contact,
            Email: user.email,
          },
          Price: proPrice,
          Discount: proDiscount,
          TotalPrice: proTotal,
          PaymentStatus: 'Completed',
          PaymentMethod: req.body.deliveryType,
          Order: {
            ProductId: product._id,
            Quantity: req.body.productQuatity,
            Price: product.Price,
          },
          Address: user.Address[req.body.addressIndex],
        };
      }
      // Payment integration
      const order = await razoPayment(proTotal * 100);

      // Send Responce
      res.json({
        status: true,
        cash: proTotal,
        rzOrderId: order.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.contact,
      });
    } else if (req.params.orderType === 'Cart') {
      const user = await userModel.findById(req.params.userId);
      const cart = await cartModel.findById(req.params.orderTypeId);

      // create Array For add To order Collection
      let orderCart = [];
      for (let i = 0; i < cart.Products.length; i++) {
        const product = await shoppingsModel.findById(
          cart.Products[i].productId
        );
        if (product) {
          orderCart.push({
            ProductId: product._id,
            Quantity: cart.Products[i].Count,
            Price: product.Price,
            Discount: product.Discount,
          });
        }
      }

      //  Product Price
      let proTotal;
      let proPrice = 0;
      let proDiscount = 0;
      if (req.body.orderCoupon === 'false') {
        for (let i = 0; i < orderCart.length; i++) {
          proDiscount += Math.round(
            ((orderCart[i].Price * orderCart[i].Quantity) / 100) *
              orderCart[i].Discount
          );
          proPrice += orderCart[i].Price * orderCart[i].Quantity;
        }
        proTotal = proPrice - proDiscount;
      } else {
        for (let i = 0; i < orderCart.length; i++) {
          proDiscount += Math.round(
            ((orderCart[i].Price * orderCart[i].Quantity) / 100) *
              orderCart[i].Discount
          );
          proPrice += orderCart[i].Price * orderCart[i].Quantity;
        }
        proTotal = proPrice - proDiscount;

        // coupon Settup
        const coupon = await couponModel.findById(req.body.orderCoupon);
        let couponDiscount = Math.round((proTotal / 100) * coupon.Discount);
        proDiscount += couponDiscount;
        proTotal -= couponDiscount;
        req.session.ordersCoupon = coupon._id;
      }

      if (req.body.deliveryType === 'Cash On Delivery') {
        await orderModel.create({
          User: {
            UserId: user._id,
            Name: `${user.firstName} ${user.lastName}`,
            Contact: user.contact,
            Email: user.email,
          },
          Price: proPrice,
          Discount: proDiscount,
          TotalPrice: proTotal,
          PaymentMethod: req.body.deliveryType,
          Order: orderCart,
          Address: user.Address[req.body.addressIndex],
        });

        if (req.session.ordersCoupon) {
          await couponModel.deleteOne({ _id: req.session.ordersCoupon });
          req.session.ordersCoupon = null;
        }

        await cartModel.deleteOne({ _id: req.params.orderTypeId });
      } else {
        req.session.orderCartId = req.params.orderTypeId;
        req.session.orderCollection = {
          User: {
            UserId: user._id,
            Name: `${user.firstName} ${user.lastName}`,
            Contact: user.contact,
            Email: user.email,
          },
          Price: proPrice,
          Discount: proDiscount,
          TotalPrice: proTotal,
          PaymentStatus: 'Completed',
          PaymentMethod: req.body.deliveryType,
          Order: orderCart,
          Address: user.Address[req.body.addressIndex],
        };
      }

      // Payment integration
      const order = await razoPayment(proTotal * 100);

      // Send Responce
      res.json({
        status: true,
        cash: proTotal,
        rzOrderId: order.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.contact,
      });
    }
  } catch (err) {
    appError(req, res, next);
  }
};

// order Successs
exports.success = async (req, res, next) => {
  try {
    await orderModel.create(req.session.orderCollection);
    req.session.orderCollection = null;

    // delete cart
    if (req.session.orderCartId) {
      await cartModel.deleteOne({ _id: req.session.orderCartId });
      req.session.orderCartId = null;
    }

    if (req.session.ordersCoupon) {
      await couponModel.deleteOne({ _id: req.session.ordersCoupon });
      req.session.ordersCoupon = null;
    }

    res.json({
      status: true,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// If Payment failed
exports.falied = async (req, res, next) => {
  try {
    req.session.orderCollection = null;
    res.json({
      status: true,
    });
  } catch (err) {
    appError(req, res, next);
  }
};
