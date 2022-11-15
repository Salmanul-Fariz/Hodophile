const cartModel = require('./../../model/cartModel');
const cartItemCount = require('./../../utils/cartItemCount');
const wishlistItemCount = require('./../../utils/wishlistItemCount');
const appError = require('./../../middleware/appError');

// Get Cart Page
exports.cartsPage = async (req, res, next) => {
  try {
    const user = req.session.user;
    const cart = await cartModel
      .findOne({ UserId: req.session.user })
      .populate('Products.productId');

    let userCart = true;
    if (!cart) {
      userCart = false;
    }
    const cartCount = await cartItemCount(req.session.user);
    const wishlistCount = await wishlistItemCount(req.session.user);

    res.render('user/carts', {
      user,
      cart,
      userId: req.session.user._id,
      userCart,
      cartCount,
      wishlistCount,
    });
  } catch (err) {
    appError(req, res, next);
  }
};

// Add To Cart
exports.addCart = async (req, res, next) => {
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
    appError(req, res, next);
  }
};

// To Increase Quaatity
exports.increaseQuatity = async (req, res, next) => {
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
    appError(req, res, next);
  }
};

// To Decrease Quaatity
exports.decreaseQuatity = async (req, res, next) => {
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
    appError(req, res, next);
  }
};

// To delete from Cart
exports.deleteCart = async (req, res, next) => {
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
    appError(req, res, next);
  }
};
