const shoppingsModel = require('../../model/shoppingsModel');
const checkItemDelete = require('../../utils/checkItemDelete');
const cartModel = require('./../../model/cartModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');

// Get Cart Page
exports.cartsPage = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ UserId: req.session.user });

    // Set Cart Add Product Details
    let AllCartProducts = [];
    let cartProducts = null;
    if (cart) {
      userCart = true;
      for (let i = 0; i < cart.Products.length; i++) {
        const product = await shoppingsModel.findById(
          cart.Products[i].productId
        );
        if (product) {
          AllCartProducts.push(product);
        }
      }
      cartProducts = await checkItemDelete(AllCartProducts);
    } else {
      userCart = false;
      cartProducts = null;
    }
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/carts', {
      cartProducts,
      cart,
      userId: req.session.user._id,
      userCart,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add To Cart
exports.addCart = async (req, res) => {
  try {
    const cartDocuments = await cartModel.findOne({
      UserId: req.params.userId,
    });

    // User has No Document
    if (!cartDocuments) {
      await cartModel.create({
        UserId: req.params.userId,
        Products: {
          productId: req.params.productId,
          Count: 1,
        },
      });
      res.json({
        status: true,
        inc: true,
      });
    } else {
      let productExist = await cartModel.aggregate([
        { $match: { UserId: req.params.userId } },
        { $unwind: '$Products' },
        { $match: { 'Products.productId': req.params.productId } },
      ]);
      // Product Not Exist
      if (productExist.length === 0) {
        await cartModel.updateOne(
          { UserId: req.params.userId },
          {
            $push: {
              Products: {
                productId: req.params.productId,
                Count: 1,
              },
            },
          }
        );
        res.json({
          status: true,
          inc: true,
        });
      } else {
        // Find The Count
        const cartCount = await cartModel.aggregate([
          { $match: { UserId: req.params.userId } },
          { $unwind: '$Products' },
          { $match: { 'Products.productId': req.params.productId } },
        ]);

        console.log(cartCount);

        // Product Exist
        if (cartCount[0].Products.Count < 10) {
          const product = await cartModel.findOne({
            UserId: req.params.userId,
          });
          let productIndex = product.Products.findIndex(
            (p) => p.productId == req.params.productId
          );
          let productInc = product.Products[productIndex];
          productInc.Count = productInc.Count + 1;
          product.Products[productIndex] = productInc;
          product.save();

          res.json({
            status: true,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// To Increase Quaatity
exports.increaseQuatity = async (req, res) => {
  try {
    await cartModel.updateOne(
      {
        UserId: req.params.userId,
        'Products.productId': req.params.productId,
      },
      {
        $inc: { 'Products.$.Count': 1 },
      }
    );
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// To Decrease Quaatity
exports.decreaseQuatity = async (req, res) => {
  try {
    const cartCount = await cartModel.aggregate([
      { $match: { UserId: req.params.userId } },
      { $unwind: '$Products' },
      { $match: { 'Products.productId': req.params.productId } },
    ]);
    console.log(cartCount[0].Products);
    if (cartCount[0].Products.Count > 1) {
      await cartModel.updateOne(
        {
          UserId: req.params.userId,
          'Products.productId': req.params.productId,
        },
        {
          $inc: { 'Products.$.Count': -1 },
        }
      );
      res.json({
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// To delete from Cart
exports.deleteCart = async (req, res) => {
  try {
    const userCart = await cartModel.findOne({ UserId: req.params.userId });
    if (userCart.Products.length > 1) {
      await cartModel.updateOne(
        { UserId: req.params.userId },
        { $pull: { Products: { productId: req.params.productId } } }
      );
    } else {
      await cartModel.deleteOne({ UserId: req.params.userId });
    }

    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};
