const shoppingsModel = require('./../../model/shoppingsModel');
const orderModel = require('./../../model/orderModel');
const userModel = require('./../../model/userModel');
const cartModel = require('./../../model/cartModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const razoPayment = require('./../../utils/razoPayment');

// Order Page
exports.orderPage = async (req, res) => {
  try {
    // Came from Direct Click Product
    let product, cartCount, wishlistCount, user, cart;
    let cartProducts = [];
    if (req.params.orderType === 'Product') {
      product = await shoppingsModel.findById(req.params.orderTypeId);
      cartCount = await cartItemCount(req.session.user);
      wishlistCount = await wishlistItemCount(req.session.user);
      user = await userModel.findById(req.params.userId);
    }
    // Came from Direct Click Cart
    else if (req.params.orderType === 'Cart') {
      cart = await cartModel.findById(req.params.orderTypeId);
      // Product Details
      for (let i = 0; i < cart.Products.length; i++) {
        const product = await shoppingsModel.findById(
          cart.Products[i].productId
        );
        if (product) {
          cartProducts.push(product);
        }
      }
      cartCount = await cartItemCount(req.session.user);
      wishlistCount = await wishlistItemCount(req.session.user);
      user = await userModel.findById(req.params.userId);
    }
    res.render('user/order', {
      cartProducts,
      cartCount,
      wishlistCount,
      product,
      cart,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add Address
exports.addAddress = async (req, res) => {
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
    console.log(err);
  }
};

// Order Submit
exports.orderSubmit = async (req, res) => {
  try {
    if (req.params.orderType === 'Product') {
      const user = await userModel.findById(req.params.userId);
      const product = await shoppingsModel.findById(req.params.orderTypeId);
      const discount = Math.round(
        ((product.Price * req.body.productQuatity) / 100) * product.Discount
      );
      const total = product.Price * req.body.productQuatity - discount;

      const orderCollection = await orderModel.create({
        User: {
          UserId: user._id,
          Name: `${user.firstName} ${user.lastName}`,
          Contact: user.contact,
          Email: user.email,
        },
        Price: product.Price,
        Discount: discount,
        TotalPrice: total,
        PaymentMethod: req.body.deliveryType,
        Order: {
          ProductId: product._id,
          Quantity: req.body.productQuatity,
          Price: product.Price,
        },
        Address: user.Address[req.body.addressIndex],
      });

      // Payment integration
      const order = await razoPayment(total * 100);

      // Send Responce
      res.json({
        status: true,
        cash: total,
        rzOrderId: order.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.contact,
        orderId: orderCollection._id,
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
          });
        }
      }

      const orderCollection = await orderModel.create({
        User: {
          UserId: user._id,
          Name: `${user.firstName} ${user.lastName}`,
          Contact: user.contact,
          Email: user.email,
        },
        Price: req.body.price,
        Discount: req.body.discount,
        TotalPrice: req.body.total,
        PaymentMethod: req.body.deliveryType,
        Order: orderCart,
        Address: user.Address[req.body.addressIndex],
      });

      // delete cart
      await cartModel.deleteOne({ _id: req.params.orderTypeId });

      // Payment integration
      const order = await razoPayment(req.body.total * 100);

      // Send Responce
      res.json({
        status: true,
        cash: req.body.total,
        rzOrderId: order.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.contact,
        orderId: orderCollection._id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// order Successs
exports.success = async (req, res) => {
  await orderModel.updateOne(
    { _id: req.params.id },
    {
      PaymentStatus: 'Complete',
    }
  );
  res.json({
    status: true,
  });
};


// If Payment failed
exports.falied = async (req, res) => {
  console.log(req.params);
  await orderModel.deleteOne({ _id: req.params.id });
  res.json({
    status: true,
  });
};
